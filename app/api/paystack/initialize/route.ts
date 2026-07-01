import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { initializePaystackPayment } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const planKey = String(body.planKey || "pro");
  const callbackUrl = `${process.env.NEXTAUTH_URL || new URL(req.url).origin}/api/paystack/verify`;

  const payment = await initializePaystackPayment({
    email: session.email,
    planKey,
    callbackUrl
  });

  return NextResponse.json(payment);
}

