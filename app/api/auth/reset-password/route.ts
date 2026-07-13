import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/api-security";
import { readPasswordResetToken } from "@/lib/password-reset";
import { getSupabaseAdmin } from "@/lib/supabase";
import { formDataToObject, resetPasswordSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const parsed = resetPasswordSchema.safeParse(await formDataToObject(req));
  if (!parsed.success) return NextResponse.redirect(new URL("/reset-password?error=invalid", req.url), 303);

  const email = await readPasswordResetToken(parsed.data.token);
  if (!email) return NextResponse.redirect(new URL("/reset-password?error=expired", req.url), 303);

  const supabase = getSupabaseAdmin();
  const { data: user, error: userError } = await supabase
    .from("app_users")
    .select("id,business_id")
    .eq("email", email)
    .maybeSingle();

  if (userError || !user) return NextResponse.redirect(new URL("/login?reset=1", req.url), 303);

  const { error } = await supabase
    .from("app_users")
    .update({ password_hash: await hashPassword(parsed.data.password) })
    .eq("id", user.id);

  if (!error) {
    await supabase.from("audit_logs").insert({
      business_id: user.business_id,
      user_id: user.id,
      action: "user:password_reset",
      entity: "User",
      entity_id: user.id
    });
  }

  return NextResponse.redirect(new URL("/login?reset=1", req.url), 303);
}
