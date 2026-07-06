import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";
import { getDemoLogin } from "@/lib/demo-auth";
import { User } from "@/models";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = String(form.get("email")).toLowerCase();
  const password = String(form.get("password"));

  try {
    await connectDB();
  } catch (error) {
    const demoUser = getDemoLogin(email, password);
    if (!demoUser) {
      return NextResponse.json(
        { message: "Database is not connected. Use a demo account or connect MongoDB in .env." },
        { status: 503 }
      );
    }
    await createSession(demoUser);
    return NextResponse.redirect(new URL(demoUser.redirectTo, req.url));
  }

  const user = await User.findOne({ email });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    const demoUser = getDemoLogin(email, password);
    if (!demoUser) return NextResponse.json({ message: "Invalid login details" }, { status: 401 });
    await createSession(demoUser);
    return NextResponse.redirect(new URL(demoUser.redirectTo, req.url));
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
