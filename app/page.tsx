import { ArrowRight, BarChart3, CheckCircle2, CreditCard, Package, ShieldCheck, ShoppingCart, Users } from "lucide-react";
import { PublicNav } from "@/components/landing/public-nav";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { subscriptionPlans } from "@/lib/plans";

const features = [
  ["Fast POS checkout", ShoppingCart],
  ["Inventory and low stock alerts", Package],
  ["Customer and loyalty records", Users],
  ["Sales and profit analytics", BarChart3],
  ["Subscription billing", CreditCard],
  ["Role-based security", ShieldCheck]
] as const;

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <main>
        <section className="bg-gradient-to-b from-white to-blue-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div>
              <Badge tone="blue">Built for Ghanaian and African SMEs</Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-extrabold tracking-tight text-slate-950 md:text-6xl">Smart Subscription-Based POS for Small and Medium Enterprises</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                PosSuite helps retail shops, pharmacies, restaurants, mini marts, fashion shops, electronics stores, and supermarkets manage sales, inventory, subscriptions, staff, and reports from one modern SaaS dashboard.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/register">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></LinkButton>
                <LinkButton href="/pricing" variant="secondary">View Pricing</LinkButton>
              </div>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  {["Sales Today", "Revenue", "Products", "Low Stock"].map((item, index) => (
                    <div key={item} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">{item}</p>
                      <strong className="mt-2 block text-2xl">{["GHS 0", "GHS 0", "0", "0"][index]}</strong>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <strong>Sales Analytics</strong>
                    <Badge tone="green">Live</Badge>
                  </div>
                  <div className="flex h-40 items-end gap-2">
                    {[35, 55, 42, 70, 64, 82, 74, 90, 78].map((height, index) => (
                      <div key={index} className="flex-1 rounded-t-lg bg-brand-500/80" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Everything SMEs need to sell smarter</h2>
            <p className="mt-3 text-slate-600">Modern POS tools inspired by global platforms, adapted for local businesses.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map(([title, Icon]) => (
              <Card key={title}>
                <CardContent>
                  <Icon className="h-7 w-7 text-brand-600" />
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-slate-500">Clean workflows, strong controls, and responsive design for desktop, tablet, and mobile.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold">Simple subscription plans</h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.key} className="bg-white text-slate-950">
                  <CardContent>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{plan.audience}</p>
                    <strong className="mt-5 block text-3xl">GHS {plan.price}</strong>
                    <ul className="mt-5 space-y-2 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {["Register your business", "Choose a plan and pay", "Start selling and reporting"].map((step, index) => (
            <Card key={step}>
              <CardContent>
                <Badge tone="blue">Step {index + 1}</Badge>
                <h3 className="mt-4 text-xl font-bold">{step}</h3>
                <p className="mt-2 text-slate-600">A guided SaaS flow helps business owners get started quickly without technical setup.</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl font-bold">Trusted by growing businesses</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["This system makes stock and sales easier to understand.", "The subscription model is affordable for our shop.", "Reports help us know profit and staff performance."].map((quote) => (
                <Card key={quote}><CardContent><p className="text-sm text-slate-600">{quote}</p><strong className="mt-4 block">SME Owner</strong></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold">FAQ</h2>
          <div className="mt-8 space-y-3">
            {["Can I use mobile money?", "Does it support multiple branches?", "Can subscriptions be renewed?", "Can reports be exported?"].map((q) => (
              <Card key={q}><CardContent><strong>{q}</strong><p className="mt-2 text-sm text-slate-500">Yes. The system is structured for production integrations and includes a safe demo mode for academic presentation.</p></CardContent></Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
