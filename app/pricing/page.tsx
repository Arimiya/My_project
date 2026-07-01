import { PublicNav } from "@/components/landing/public-nav";
import { subscriptionPlans } from "@/lib/plans";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <>
      <PublicNav />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.key}>
              <CardContent>
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <strong className="mt-4 block text-3xl">GHS {plan.price}</strong>
                <p className="mt-2 text-sm text-slate-500">{plan.audience}</p>
                <LinkButton href={`/register?plan=${plan.key}`} className="mt-5 w-full">Choose Plan</LinkButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

