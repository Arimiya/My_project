import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";

export default async function ResetPasswordPage({ searchParams }: { searchParams?: Promise<{ token?: string; error?: string }> }) {
  const params = await searchParams;
  const token = params?.token || "";
  const hasError = Boolean(params?.error);

  return (
    <>
      <PublicNav />
      <main className="app-page flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6 sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <LockKeyhole className="h-7 w-7" />
            </span>
            <h1 className="mt-6 text-3xl font-bold text-slate-950">Choose a new password</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">Use at least 8 characters. Your reset link expires after 20 minutes.</p>
            {hasError ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                This reset link is invalid or expired. Please request a new one.
              </div>
            ) : null}
            {token ? (
              <form action="/api/auth/reset-password" method="post" className="mt-7 space-y-4">
                <input type="hidden" name="token" value={token} />
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">New password</span>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <button className="h-12 w-full rounded-xl bg-brand-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-brand-700">
                  Update Password
                </button>
              </form>
            ) : (
              <Link href="/forgot-password" className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white">
                Request New Link
              </Link>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
