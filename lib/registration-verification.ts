import { SignJWT, jwtVerify } from "jose";
import { hashPassword, verifyPassword } from "./auth";

export const pendingRegistrationCookie = "pending_registration";
const issuer = "pos-suite-registration";

export type PendingRegistration = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  location: string;
  passwordHash: string;
  planKey: string;
  codeHash: string;
};

function secretKey() {
  return new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "development-secret-change-me");
}

export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createPendingRegistrationToken(input: Omit<PendingRegistration, "codeHash">, code: string) {
  const token = await new SignJWT({
    ...input,
    codeHash: await hashPassword(code)
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(issuer)
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secretKey());

  return token;
}

export async function readPendingRegistration(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { issuer });
    return payload as unknown as PendingRegistration;
  } catch {
    return null;
  }
}

export async function verifyRegistrationCode(pending: PendingRegistration, code: string) {
  return verifyPassword(code.trim(), pending.codeHash);
}
