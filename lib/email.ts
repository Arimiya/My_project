type VerificationEmailInput = {
  to: string;
  code: string;
  fullName: string;
};

export async function sendRegistrationCodeEmail({ to, code, fullName }: VerificationEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[registration-code] ${to}: ${code}`);
      return { delivered: false, mode: "development-log" as const };
    }

    throw new Error("Email delivery is not configured. Add RESEND_API_KEY and EMAIL_FROM.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Your ProSale POS registration code",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2>Confirm your ProSale POS account</h2>
          <p>Hello ${fullName},</p>
          <p>Use this confirmation code to finish creating your business account:</p>
          <p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p>
          <p>This code expires in 15 minutes. If you did not request this account, you can ignore this email.</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}`);
  }

  return { delivered: true, mode: "email" as const };
}

export async function sendPasswordResetEmail({ to, resetUrl }: { to: string; resetUrl: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[password-reset] ${to}: ${resetUrl}`);
      return { delivered: false, mode: "development-log" as const };
    }

    throw new Error("Email delivery is not configured. Add RESEND_API_KEY and EMAIL_FROM.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Reset your ProSale POS password",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2>Reset your password</h2>
          <p>Use the secure link below to reset your ProSale POS password. This link expires in 20 minutes.</p>
          <p><a href="${resetUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none">Reset password</a></p>
          <p>If you did not request a password reset, you can ignore this email.</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}`);
  }

  return { delivered: true, mode: "email" as const };
}
