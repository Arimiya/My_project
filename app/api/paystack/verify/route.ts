import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPlan } from "@/lib/plans";
import { addDays } from "@/lib/utils";
import { verifyPaystackPayment } from "@/lib/paystack";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.businessId) return NextResponse.redirect(new URL("/login", req.url));

  const supabase = getSupabaseAdmin();
  const url = new URL(req.url);
  const reference = url.searchParams.get("reference") || "";
  const planKey = url.searchParams.get("plan") || "pro";
  const verification = await verifyPaystackPayment(reference);
  const plan = getPlan(planKey);

  if (verification.status !== "success") {
    await supabase.from("payments").insert({
      business_id: session.businessId,
      reference,
      amount: plan.price,
      status: "failed",
      provider: "paystack"
    });
    return NextResponse.redirect(new URL("/dashboard/subscription?payment=failed", req.url));
  }

  const subscriptionPayload = {
    business_id: session.businessId,
    plan_key: plan.key,
    status: plan.key === "trial" ? "trial" : "active",
    start_date: new Date().toISOString(),
    expiry_date: addDays(new Date(), plan.durationDays).toISOString()
  };

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("business_id", session.businessId)
    .maybeSingle();

  const subscriptionResult = existing
    ? await supabase.from("subscriptions").update(subscriptionPayload).eq("id", existing.id).select("id").single()
    : await supabase.from("subscriptions").insert(subscriptionPayload).select("id").single();

  if (subscriptionResult.error) {
    return NextResponse.redirect(new URL("/dashboard/subscription?payment=failed", req.url));
  }

  await supabase.from("payments").insert({
    business_id: session.businessId,
    subscription_id: subscriptionResult.data.id,
    provider: "paystack",
    reference,
    amount: plan.price,
    currency: "GHS",
    status: "success",
    metadata: verification,
    paid_at: new Date().toISOString()
  });

  await supabase.from("businesses").update({ status: "active" }).eq("id", session.businessId);

  return NextResponse.redirect(new URL("/dashboard?payment=success", req.url));
}
