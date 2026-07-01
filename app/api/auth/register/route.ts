import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";
import { addDays } from "@/lib/utils";
import { getPlan } from "@/lib/plans";
import { Branch, Business, Subscription, User } from "@/models";

export async function POST(req: NextRequest) {
  await connectDB();
  const form = await req.formData();
  const plan = getPlan(String(form.get("plan") || "trial"));
  const email = String(form.get("email")).toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ message: "Email already exists" }, { status: 409 });

  const business = await Business.create({
    name: form.get("businessName"),
    type: form.get("businessType"),
    location: form.get("location"),
    phone: form.get("phone"),
    email,
    status: plan.key === "trial" ? "trial" : "expired"
  });
  const branch = await Branch.create({ businessId: business._id, name: "Main Branch", location: form.get("location"), phone: form.get("phone") });
  const user = await User.create({
    businessId: business._id,
    branchId: branch._id,
    fullName: form.get("fullName"),
    email,
    phone: form.get("phone"),
    passwordHash: await hashPassword(String(form.get("password"))),
    role: "owner"
  });
  await Subscription.create({
    businessId: business._id,
    planKey: plan.key,
    status: plan.key === "trial" ? "trial" : "expired",
    startDate: new Date(),
    expiryDate: addDays(new Date(), plan.durationDays)
  });
  await createSession({
    userId: String(user._id),
    businessId: String(business._id),
    branchId: String(branch._id),
    role: "owner",
    email: user.email
  });
  return NextResponse.redirect(new URL(plan.price > 0 ? `/dashboard/subscription?plan=${plan.key}` : "/dashboard", req.url));
}
