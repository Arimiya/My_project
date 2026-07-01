import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";
import { subscriptionPlans } from "@/lib/plans";

const businessTypes = ["Retail", "Pharmacy", "Restaurant", "Mini mart", "Fashion shop", "Electronics", "Supermarket", "Hardware"];

export default async function RegisterPage({ searchParams }: { searchParams?: Promise<{ plan?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <PublicNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardContent>
            <h1 className="text-2xl font-bold">Register your business</h1>
            <p className="mt-1 text-sm text-slate-500">Create your owner account, choose a plan, and continue to subscription activation.</p>
            <form action="/api/auth/register" method="post" className="mt-6 grid gap-3 md:grid-cols-2">
              <input name="fullName" required placeholder="Full name" className="h-11 rounded-lg border px-3" />
              <input name="email" required type="email" placeholder="Email" className="h-11 rounded-lg border px-3" />
              <input name="phone" required placeholder="Phone number" className="h-11 rounded-lg border px-3" />
              <input name="businessName" required placeholder="Business name" className="h-11 rounded-lg border px-3" />
              <select name="businessType" className="h-11 rounded-lg border px-3">
                {businessTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
              <input name="location" required placeholder="Business location" className="h-11 rounded-lg border px-3" />
              <input name="password" required type="password" placeholder="Password" className="h-11 rounded-lg border px-3" />
              <select name="plan" defaultValue={params?.plan || "trial"} className="h-11 rounded-lg border px-3">
                {subscriptionPlans.map((plan) => <option value={plan.key} key={plan.key}>{plan.name}</option>)}
              </select>
              <button className="h-11 rounded-lg bg-brand-600 font-semibold text-white md:col-span-2">Create Account</button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
