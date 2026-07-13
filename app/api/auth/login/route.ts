import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { getDemoLogin } from "@/lib/demo-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = String(form.get("email")).toLowerCase();
  const password = String(form.get("password"));

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
      if (!demoUser) return NextResponse.json({ message: "Invalid login details" }, { status: 401 });
      await createSession(demoUser);
      return NextResponse.redirect(new URL(demoUser.redirectTo, req.url));
    }

    await supabase.from("app_users").update({ last_login_at: new Date().toISOString() }).eq("id", user.id);
    await createSession({
      userId: user.id,
      businessId: user.business_id ?? undefined,
      branchId: user.branch_id ?? undefined,
      role: user.role,
      email: user.email
    });

    return NextResponse.redirect(new URL(user.role === "super_admin" ? "/super-admin" : "/dashboard", req.url));
  } catch (error) {
    const demoUser = getDemoLogin(email, password);
    if (!demoUser) {
      return NextResponse.json(
        { message: "Supabase is not connected. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env." },
        { status: 503 }
      );
    }
    await createSession(demoUser);
    return NextResponse.redirect(new URL(demoUser.redirectTo, req.url));
  }
}
