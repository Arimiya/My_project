import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/plans";

export default function SubscriptionPage() {
  return (
    <section className="space-y-6">
      <div className="professional-card rounded-2xl p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Billing and access</p>
        <h1 className="mt-1 text-2xl font-bold">Subscription</h1>
        <p className="text-sm text-slate-500">Manage current plan, payment history, renewal, upgrade, and downgrade.</p>
      </div>

      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="green">Active</Badge>
            <h2 className="mt-3 text-2xl font-bold">Pro Plan</h2>
            <p className="text-sm text-slate-600">Started Jun 16, 2026 - Expires Jul 16, 2026</p>
          </div>
          <Button>Renew Subscription</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-4">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.key} className={plan.key === "pro" ? "border-brand-300 ring-4 ring-blue-100" : ""}>
            <CardContent>
              {plan.key === "pro" ? <Badge tone="blue">Current plan</Badge> : null}
              <h2 className="mt-3 font-bold">{plan.name}</h2>
              <strong className="mt-3 block text-3xl">GHS {plan.price}</strong>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-5 w-full" variant={plan.key === "pro" ? "secondary" : "primary"}>
                {plan.key === "pro" ? "Current Plan" : "Choose Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
