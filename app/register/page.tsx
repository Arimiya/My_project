import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";
import { subscriptionPlans } from "@/lib/plans";
import { BadgeCheck, Building2, LockKeyhole, MapPin, Phone, UserRound } from "lucide-react";

const businessTypes = ["Retail", "Pharmacy", "Restaurant", "Mini mart", "Fashion shop", "Electronics", "Supermarket", "Hardware"];

export default async function RegisterPage({ searchParams }: { searchParams?: Promise<{ plan?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <PublicNav />
      <main className="app-page px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-blue-100">
              <BadgeCheck className="h-4 w-4" />
              14-day trial available
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight">Create your POS business workspace.</h1>
            <p className="mt-4 leading-7 text-slate-300">Register your shop, choose a subscription plan, and start managing sales, inventory, customers, and staff from one dashboard.</p>
            <div className="mt-8 space-y-3 text-sm text-slate-200">
              {["Secure owner account", "Business and branch setup", "Paystack-ready subscription flow"].map((item) => (
                <p key={item} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-300" />{item}</p>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Register your business</h2>
            <p className="mt-1 text-sm text-slate-500">Create your owner account, choose a plan, and continue to subscription activation.</p>
            <form action="/api/auth/register" method="post" className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="input-shell flex h-12 items-center gap-3 rounded-xl px-3"><UserRound className="h-5 w-5 text-slate-400" /><input name="fullName" required placeholder="Full name" className="h-full flex-1 bg-transparent outline-none" /></label>
              <label className="input-shell flex h-12 items-center gap-3 rounded-xl px-3"><UserRound className="h-5 w-5 text-slate-400" /><input name="email" required type="email" placeholder="Email" className="h-full flex-1 bg-transparent outline-none" /></label>
              <label className="input-shell flex h-12 items-center gap-3 rounded-xl px-3"><Phone className="h-5 w-5 text-slate-400" /><input name="phone" required placeholder="Phone number" className="h-full flex-1 bg-transparent outline-none" /></label>
              <label className="input-shell flex h-12 items-center gap-3 rounded-xl px-3"><Building2 className="h-5 w-5 text-slate-400" /><input name="businessName" required placeholder="Business name" className="h-full flex-1 bg-transparent outline-none" /></label>
              <select name="businessType" className="input-shell h-12 rounded-xl px-3">
                {businessTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
              <label className="input-shell flex h-12 items-center gap-3 rounded-xl px-3"><MapPin className="h-5 w-5 text-slate-400" /><input name="location" required placeholder="Business location" className="h-full flex-1 bg-transparent outline-none" /></label>
              <label className="input-shell flex h-12 items-center gap-3 rounded-xl px-3"><LockKeyhole className="h-5 w-5 text-slate-400" /><input name="password" required type="password" placeholder="Password" className="h-full flex-1 bg-transparent outline-none" /></label>
              <select name="plan" defaultValue={params?.plan || "trial"} className="input-shell h-12 rounded-xl px-3">
                {subscriptionPlans.map((plan) => <option value={plan.key} key={plan.key}>{plan.name}</option>)}
              </select>
              <button className="h-12 rounded-xl bg-brand-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-brand-700 md:col-span-2">Create Account</button>
            </form>
          </CardContent>
        </Card>
        </section>
      </main>
    </>
  );
}
