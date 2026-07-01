import { getPlan } from "./plans";

export async function initializePaystackPayment(input: {
  email: string;
  planKey: string;
  callbackUrl: string;
}) {
  const plan = getPlan(input.planKey);
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret || process.env.APP_DEMO_MODE === "true") {
    return {
      demo: true,
      authorizationUrl: `${input.callbackUrl}?reference=DEMO-${Date.now()}&plan=${plan.key}`,
      reference: `DEMO-${Date.now()}`
    };
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: input.email,
      amount: Math.round(plan.price * 100),
      callback_url: input.callbackUrl,
      metadata: { planKey: plan.key }
    })
  });

  if (!response.ok) throw new Error("Unable to initialize Paystack payment");
  const data = await response.json();
  return {
    demo: false,
    authorizationUrl: data.data.authorization_url,
    reference: data.data.reference
  };
}

export async function verifyPaystackPayment(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || reference.startsWith("DEMO-") || process.env.APP_DEMO_MODE === "true") {
    return { status: "success", reference, demo: true };
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${secret}` }
  });
  if (!response.ok) throw new Error("Unable to verify Paystack payment");
  const data = await response.json();
  return { status: data.data.status, reference, demo: false };
}

