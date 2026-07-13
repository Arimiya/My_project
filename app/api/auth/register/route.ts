import { NextRequest, NextResponse } from "next/server";
import { createSession, hashPassword } from "@/lib/auth";
import { addDays } from "@/lib/utils";
import { getPlan } from "@/lib/plans";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  const form = await req.formData();
  const plan = getPlan(String(form.get("plan") || "trial"));
  const email = String(form.get("email")).toLowerCase();

  const { data: existing, error: existingError } = await supabase
    .from("app_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) return NextResponse.json({ message: "Email already exists" }, { status: 409 });

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .insert({
      name: String(form.get("businessName")),
      type: String(form.get("businessType")),
      location: String(form.get("location")),
      phone: String(form.get("phone")),
      email,
      status: plan.key === "trial" ? "trial" : "expired"
    })
    .select("id")
    .single();

  if (businessError) throw businessError;

  const { data: branch, error: branchError } = await supabase
    .from("branches")
    .insert({
      business_id: business.id,
      name: "Main Branch",
      location: String(form.get("location")),
      phone: String(form.get("phone"))
    })
    .select("id")
    .single();

  if (branchError) throw branchError;

  const { data: user, error: userError } = await supabase
    .from("app_users")
    .insert({
      business_id: business.id,
      branch_id: branch.id,
      full_name: String(form.get("fullName")),
      email,
      phone: String(form.get("phone")),
      password_hash: await hashPassword(String(form.get("password"))),
      role: "owner"
    })
    .select("id,email")
    .single();

  if (userError) throw userError;

  await supabase.from("subscriptions").insert({
    business_id: business.id,
    plan_key: plan.key,
    status: plan.key === "trial" ? "trial" : "expired",
    start_date: new Date().toISOString(),
    expiry_date: addDays(new Date(), plan.durationDays).toISOString()
  });

  await createSession({
    userId: user.id,
    businessId: business.id,
    branchId: branch.id,
    role: "owner",
    email: user.email
  });

  return NextResponse.redirect(new URL(plan.price > 0 ? `/dashboard/subscription?plan=${plan.key}` : "/dashboard", req.url));
}
