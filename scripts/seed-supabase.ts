import { hashPassword } from "../lib/auth";
import { subscriptionPlans } from "../lib/plans";
import { getSupabaseAdmin } from "../lib/supabase";
import { existsSync, readFileSync } from "node:fs";

function loadLocalEnv() {
  if (!existsSync(".env")) return;
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].replace(/^\uFEFF/, "").trim();
      if (!process.env[key]) process.env[key] = match[2];
    }
  }
}

async function main() {
  loadLocalEnv();
  const supabase = getSupabaseAdmin();

  for (const plan of subscriptionPlans) {
    const { error } = await supabase.from("subscription_plans").upsert(
      {
        key: plan.key,
        name: plan.name,
        price: plan.price,
        duration_days: plan.durationDays,
        features: plan.features,
        limits: plan.limits,
        active: true
      },
      { onConflict: "key" }
    );
    if (error) throw error;
  }

  const businessRecord = {
    name: "Demo Retail Store",
    type: "Retail",
    location: "Accra, Ghana",
    phone: "+233 24 000 0000",
    email: "owner@demo.com",
    currency: "GHS",
    tax_rate: 0,
    status: "active"
  };

  const { data: existingBusiness, error: existingBusinessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("email", businessRecord.email)
    .maybeSingle();

  if (existingBusinessError) throw existingBusinessError;

  const { data: business, error: businessError } = existingBusiness
    ? await supabase.from("businesses").update(businessRecord).eq("id", existingBusiness.id).select("id").single()
    : await supabase.from("businesses").insert(businessRecord).select("id").single();

  if (businessError) throw businessError;

  const { data: branch, error: branchError } = await supabase
    .from("branches")
    .insert({ business_id: business.id, name: "Main Branch", location: "Accra Central", phone: "+233 24 000 0000" })
    .select("id")
    .single();

  if (branchError) throw branchError;

  const users = [
    { full_name: "Platform Admin", email: "admin@possystem.com", password: "Admin12345", role: "super_admin", business_id: null, branch_id: null },
    { full_name: "Demo Owner", email: "owner@demo.com", password: "Owner12345", role: "owner", business_id: business.id, branch_id: branch.id },
    { full_name: "Demo Cashier", email: "cashier@demo.com", password: "Cashier12345", role: "cashier", business_id: business.id, branch_id: branch.id }
  ];

  for (const user of users) {
    const { password, ...record } = user;
    const { error } = await supabase.from("app_users").upsert(
      {
        ...record,
        password_hash: await hashPassword(password),
        active: true
      },
      { onConflict: "email" }
    );
    if (error) throw error;
  }

  await supabase.from("subscriptions").insert({
    business_id: business.id,
    plan_key: "trial",
    status: "trial",
    start_date: new Date().toISOString(),
    expiry_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString()
  });

  console.log("Supabase seed completed.");
  console.log("Super Admin: admin@possystem.com / Admin12345");
  console.log("Business Owner: owner@demo.com / Owner12345");
  console.log("Cashier: cashier@demo.com / Cashier12345");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
