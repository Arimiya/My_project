import Link from "next/link";
import { MailCheck, ShieldCheck } from "lucide-react";
import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";

type VerifyEmailSearchParams = {
  email?: string;
  error?: string;
};

export default async function VerifyEmailPage({ searchParams }: { searchParams?: Promise<VerifyEmailSearchParams> }) {
  const params = await searchParams;
  const email = params?.email;
  const invalidCode = params?.error === "invalid-code";

  return (
    <>
      <PublicNav />
      <main className="app-page flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-xl">
          <CardContent className="p-6 sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <MailCheck className="h-7 w-7" />
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Email confirmation</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">Enter your confirmation code</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              We sent a 6-digit confirmation code to {email ? <strong className="text-slate-700">{email}</strong> : "your email address"}. Enter it below to finish creating your POS account.
            </p>

            {invalidCode ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                The confirmation code is not correct. Check your email and try again.
              </div>
            ) : null}

            <form action="/api/auth/verify-registration" method="post" className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Confirmation code</span>
                <input
                  name="code"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="123456"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-center text-xl font-bold tracking-[0.4em] outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <button className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-brand-700">
                <ShieldCheck className="mr-2 h-5 w-5" />
                Verify and Create Account
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              Need to change the email? <Link href="/register" className="font-semibold text-brand-600">Start registration again</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
