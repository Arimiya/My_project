import { SignJWT, jwtVerify } from "jose";

const issuer = "pos-suite-password-reset";

function secretKey() {
  return new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "development-secret-change-me");
}

export async function createPasswordResetToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(issuer)
    .setIssuedAt()
    .setExpirationTime("20m")
    .sign(secretKey());
}

export async function readPasswordResetToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey(), { issuer });
    return typeof payload.email === "string" ? payload.email.toLowerCase() : null;
  } catch {
    return null;
  }
}
