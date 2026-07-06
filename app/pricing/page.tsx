import { PublicNav } from "@/components/landing/public-nav";
import { subscriptionPlans } from "@/lib/plans";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <>
      <PublicNav />
      <main className="app-page px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <Badge tone="blue">Flexible SaaS pricing</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Plans that grow with every SME.</h1>
          <p className="mt-4 text-slate-600">Start with a trial, then upgrade when you need more users, branches, reports, and inventory controls.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.key} className={plan.key === "pro" ? "border-brand-300 ring-4 ring-blue-100" : ""}>
              <CardContent>
                {plan.key === "pro" ? <Badge tone="blue">Most popular</Badge> : null}
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <strong className="mt-4 block text-3xl">GHS {plan.price}</strong>
                <p className="mt-2 text-sm text-slate-500">{plan.audience}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {plan.features.map((feature) => <li key={feature} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{feature}</li>)}
                </ul>
                <LinkButton href={`/register?plan=${plan.key}`} className="mt-5 w-full">Choose Plan</LinkButton>
              </CardContent>
            </Card>
          ))}
        </div>
        </section>
      </main>
    </>
  );
}
