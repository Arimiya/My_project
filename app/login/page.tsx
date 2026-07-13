import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <PublicNav />
      <main className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_34%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(7,24,47,0.98))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />

        <section className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="py-8 lg:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-blue-100">
              <Sparkles className="h-4 w-4" />
              Subscription POS for growing SMEs
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Run sales, stock, staff, and subscriptions from one clean dashboard.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Sign in to manage checkout, inventory, customers, reports, staff permissions, and business subscription status.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              {["Secure sessions", "Ghana payments", "Role-based access"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-3">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="relative border-white/20 bg-white text-slate-950 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Welcome back</p>
                  <h2 className="mt-2 text-3xl font-bold">Login</h2>
                  <p className="mt-2 text-sm text-slate-500">Use your registered business email and password.</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <ShieldCheck className="h-6 w-6" />
                </span>
              </div>

              <form action="/api/auth/login" method="post" className="mt-7 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                  <span className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <input name="email" type="email" required placeholder="you@business.com" className="h-full flex-1 bg-transparent text-sm outline-none" />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                  <span className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <LockKeyhole className="h-5 w-5 text-slate-400" />
                    <input name="password" type="password" required placeholder="Enter password" className="h-full flex-1 bg-transparent text-sm outline-none" />
                  </span>
                </label>

                <button className="h-12 w-full rounded-xl bg-brand-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-brand-700">
                  Login to Dashboard
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-500">
                <a href="/forgot-password" className="font-semibold text-brand-600">Forgot password?</a>
                <span className="mx-2 text-slate-300">|</span>
                New to ProSale POS? <a href="/register" className="font-semibold text-brand-600">Create a business account</a>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
