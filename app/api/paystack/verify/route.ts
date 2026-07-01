import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getPlan } from "@/lib/plans";
import { addDays } from "@/lib/utils";
import { verifyPaystackPayment } from "@/lib/paystack";
import { Business, Payment, Subscription } from "@/models";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.businessId) return NextResponse.redirect(new URL("/login", req.url));

  await connectDB();
  const url = new URL(req.url);
  const reference = url.searchParams.get("reference") || "";
  const planKey = url.searchParams.get("plan") || "pro";
  const verification = await verifyPaystackPayment(reference);
  const plan = getPlan(planKey);

  if (verification.status !== "success") {
    await Payment.create({ businessId: session.businessId, reference, amount: plan.price, status: "failed", provider: "paystack" });
    return NextResponse.redirect(new URL("/dashboard/subscription?payment=failed", req.url));
  }

  const subscription = await Subscription.findOneAndUpdate(
    { businessId: session.businessId },
    {
      planKey: plan.key,
      status: plan.key === "trial" ? "trial" : "active",
      startDate: new Date(),
      expiryDate: addDays(new Date(), plan.durationDays)
    },
    { upsert: true, new: true }
  );

  await Payment.create({
    businessId: session.businessId,
    subscriptionId: subscription._id,
    provider: "paystack",
    reference,
    amount: plan.price,
    currency: "GHS",
    status: "success",
    metadata: verification
  });
  await Business.findByIdAndUpdate(session.businessId, { status: "active" });

  return NextResponse.redirect(new URL("/dashboard?payment=success", req.url));
}

