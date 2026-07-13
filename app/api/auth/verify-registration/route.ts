import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { addDays } from "@/lib/utils";
import { getPlan } from "@/lib/plans";
import { getSupabaseAdmin } from "@/lib/supabase";
import { assertSameOrigin } from "@/lib/api-security";
import {
  pendingRegistrationCookie,
  readPendingRegistration,
  verifyRegistrationCode
} from "@/lib/registration-verification";
import { formDataToObject, verificationCodeSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const token = req.cookies.get(pendingRegistrationCookie)?.value;
  const pending = await readPendingRegistration(token);
  const parsed = verificationCodeSchema.safeParse(await formDataToObject(req));

  if (!pending) {
    return NextResponse.redirect(new URL("/register?error=verification-expired", req.url), 303);
  }

  if (!parsed.success || !(await verifyRegistrationCode(pending, parsed.data.code))) {
    return NextResponse.redirect(new URL(`/verify-email?email=${encodeURIComponent(pending.email)}&error=invalid-code`, req.url), 303);
  }

  const supabase = getSupabaseAdmin();
  const plan = getPlan(pending.planKey);

  const { data: existing, error: existingError } = await supabase
    .from("app_users")
    .select("id")
    .eq("email", pending.email)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) {
    const response = NextResponse.redirect(new URL("/login?registered=existing", req.url), 303);
    response.cookies.delete(pendingRegistrationCookie);
    return response;
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .insert({
      name: pending.businessName,
      type: pending.businessType,
      location: pending.location,
      phone: pending.phone,
      email: pending.email,
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
      location: pending.location,
      phone: pending.phone
    })
    .select("id")
    .single();

  if (branchError) throw branchError;

  const { data: user, error: userError } = await supabase
    .from("app_users")
    .insert({
      business_id: business.id,
      branch_id: branch.id,
      full_name: pending.fullName,
      email: pending.email,
      phone: pending.phone,
      password_hash: pending.passwordHash,
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

  const response = NextResponse.redirect(new URL(plan.price > 0 ? `/dashboard/subscription?plan=${plan.key}` : "/dashboard", req.url), 303);
  response.cookies.delete(pendingRegistrationCookie);
  return response;
}
