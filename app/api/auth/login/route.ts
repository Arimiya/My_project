import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";
import { User } from "@/models";

export async function POST(req: NextRequest) {
  await connectDB();
  const form = await req.formData();
  const email = String(form.get("email")).toLowerCase();
  const password = String(form.get("password"));
  const user = await User.findOne({ email });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ message: "Invalid login details" }, { status: 401 });
  }
  user.lastLoginAt = new Date();
  await user.save();
  await createSession({
    userId: String(user._id),
    businessId: user.businessId ? String(user.businessId) : undefined,
    branchId: user.branchId ? String(user.branchId) : undefined,
    role: user.role,
    email: user.email
  });
  return NextResponse.redirect(new URL(user.role === "super_admin" ? "/super-admin" : "/dashboard", req.url));
}
