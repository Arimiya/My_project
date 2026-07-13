import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";

export default async function ForgotPasswordPage({ searchParams }: { searchParams?: Promise<{ sent?: string }> }) {
  const params = await searchParams;
  const sent = params?.sent === "1";

  return (
    <>
      <PublicNav />
      <main className="app-page flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6 sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <h1 className="mt-6 text-3xl font-bold text-slate-950">Reset your password</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your account email. If the account exists, we will send a secure reset link.
            </p>
            {sent ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                If that email is registered, a reset link has been sent.
              </div>
            ) : null}
            <form action="/api/auth/forgot-password" method="post" className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                <span className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input name="email" type="email" required autoComplete="email" className="h-full flex-1 bg-transparent text-sm outline-none" />
                </span>
              </label>
              <button className="h-12 w-full rounded-xl bg-brand-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-brand-700">
                Send Reset Link
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-500">
              Remembered it? <Link href="/login" className="font-semibold text-brand-600">Back to login</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
