import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/plans";

export default function SubscriptionPage() {
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="text-sm text-slate-500">Manage current plan, payment history, renewal, upgrade, and downgrade.</p>
      </div>
      <Card className="mb-6 border-emerald-200 bg-emerald-50">
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div><Badge tone="green">Active</Badge><h2 className="mt-3 text-2xl font-bold">Pro Plan</h2><p className="text-sm text-slate-600">Started Jun 16, 2026 • Expires Jul 16, 2026</p></div>
          <Button>Renew Subscription</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-4">
        {subscriptionPlans.map((plan) => <Card key={plan.key}><CardContent><h2 className="font-bold">{plan.name}</h2><strong className="mt-3 block text-3xl">GHS {plan.price}</strong><ul className="mt-4 space-y-2 text-sm text-slate-600">{plan.features.map((f) => <li key={f}>✓ {f}</li>)}</ul><Button className="mt-5 w-full" variant={plan.key === "pro" ? "secondary" : "primary"}>{plan.key === "pro" ? "Current Plan" : "Choose Plan"}</Button></CardContent></Card>)}
      </div>
    </section>
  );
}

