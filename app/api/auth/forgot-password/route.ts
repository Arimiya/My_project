import { NextRequest, NextResponse } from "next/server";
import { assertSameOrigin } from "@/lib/api-security";
import { sendPasswordResetEmail } from "@/lib/email";
import { createPasswordResetToken } from "@/lib/password-reset";
import { getSupabaseAdmin } from "@/lib/supabase";
import { forgotPasswordSchema, formDataToObject } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const parsed = forgotPasswordSchema.safeParse(await formDataToObject(req));
  const redirectUrl = new URL("/forgot-password?sent=1", req.url);

  if (!parsed.success) return NextResponse.redirect(redirectUrl, 303);

  const supabase = getSupabaseAdmin();
  const { data: user } = await supabase
    .from("app_users")
    .select("email")
    .eq("email", parsed.data.email)
    .maybeSingle();

  if (user?.email) {
    const token = await createPasswordResetToken(user.email);
    const resetUrl = `${process.env.NEXTAUTH_URL || new URL(req.url).origin}/reset-password?token=${encodeURIComponent(token)}`;
    await sendPasswordResetEmail({ to: user.email, resetUrl });
  }

  return NextResponse.redirect(redirectUrl, 303);
}
