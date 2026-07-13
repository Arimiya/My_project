import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { getPlan } from "@/lib/plans";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendRegistrationCodeEmail } from "@/lib/email";
import { assertSameOrigin } from "@/lib/api-security";
import {
  createPendingRegistrationToken,
  generateVerificationCode,
  pendingRegistrationCookie
} from "@/lib/registration-verification";
import { formDataToObject, registerSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const supabase = getSupabaseAdmin();
  const parsed = registerSchema.safeParse(await formDataToObject(req));

  if (!parsed.success) {
    return NextResponse.json({ message: "Complete all fields and use a password with at least 8 characters." }, { status: 400 });
  }

  const input = parsed.data;
  const plan = getPlan(input.plan);
  const email = input.email;

  const { data: existing, error: existingError } = await supabase
    .from("app_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) return NextResponse.json({ message: "Email already exists" }, { status: 409 });

  const code = generateVerificationCode();
  const token = await createPendingRegistrationToken(
    {
      fullName: input.fullName,
      email,
      phone: input.phone,
      businessName: input.businessName,
      businessType: input.businessType,
      location: input.location,
      passwordHash: await hashPassword(input.password),
      planKey: plan.key
    },
    code
  );

  await sendRegistrationCodeEmail({ to: email, code, fullName: input.fullName });

  const response = NextResponse.redirect(new URL(`/verify-email?email=${encodeURIComponent(email)}`, req.url), 303);
  response.cookies.set(pendingRegistrationCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15
  });

  return response;
}
