import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { getDemoLogin } from "@/lib/demo-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { assertSameOrigin, safeErrorResponse } from "@/lib/api-security";
import { checkRateLimit, clearAttempts, getClientKey, recordFailedAttempt } from "@/lib/rate-limit";
import { formDataToObject, loginSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const rateKey = getClientKey(req, "login");
  const limit = checkRateLimit(rateKey);
  if (!limit.allowed) {
    return NextResponse.json({ message: "Too many failed attempts. Please try again later." }, { status: 429 });
  }

  const parsed = loginSchema.safeParse(await formDataToObject(req));
  if (!parsed.success) return NextResponse.json({ message: "Invalid login details" }, { status: 400 });

  const { email, password } = parsed.data;

  try {
    const supabase = getSupabaseAdmin();
    const { data: user, error } = await supabase
      .from("app_users")
      .select("id,business_id,branch_id,email,password_hash,role,active")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    if (!user || !user.active || !(await verifyPassword(password, user.password_hash))) {
      const demoUser = getDemoLogin(email, password);
      if (!demoUser) {
        recordFailedAttempt(rateKey);
        return NextResponse.json({ message: "Invalid login details" }, { status: 401 });
      }
      await createSession(demoUser);
      clearAttempts(rateKey);
      return NextResponse.redirect(new URL(demoUser.redirectTo, req.url));
    }

    await supabase.from("app_users").update({ last_login_at: new Date().toISOString() }).eq("id", user.id);
    await supabase.from("audit_logs").insert({
      business_id: user.business_id,
      user_id: user.id,
      action: "user:login",
      entity: "User",
      entity_id: user.id
    });
    await createSession({
      userId: user.id,
      businessId: user.business_id ?? undefined,
      branchId: user.branch_id ?? undefined,
      role: user.role,
      email: user.email
    });

    clearAttempts(rateKey);
    return NextResponse.redirect(new URL(user.role === "super_admin" ? "/super-admin" : "/dashboard", req.url));
  } catch (error) {
    const demoUser = getDemoLogin(email, password);
    if (!demoUser) {
      recordFailedAttempt(rateKey);
      return safeErrorResponse("Login is temporarily unavailable. Please try again.", 503);
    }
    await createSession(demoUser);
    clearAttempts(rateKey);
    return NextResponse.redirect(new URL(demoUser.redirectTo, req.url));
  }
}
