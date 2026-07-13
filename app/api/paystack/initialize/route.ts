import { NextRequest, NextResponse } from "next/server";
import { initializePaystackPayment } from "@/lib/paystack";
import { assertSameOrigin, requireApiSession } from "@/lib/api-security";
import { paystackInitializeSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const { session, response } = await requireApiSession("business:*");
  if (response) return response;

  const parsed = paystackInitializeSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ message: "Invalid subscription plan" }, { status: 400 });

  const callbackUrl = `${process.env.NEXTAUTH_URL || new URL(req.url).origin}/api/paystack/verify`;

  const payment = await initializePaystackPayment({
    email: session.email,
    planKey: parsed.data.planKey,
    callbackUrl
  });

  return NextResponse.json(payment);
}
