import { Building2, CreditCard, Timer, Wallet } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function SuperAdminPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Platform overview</p>
        <h1 className="mt-1 text-2xl font-bold">Super Admin Dashboard</h1>
        <p className="text-sm text-slate-500">Platform records will appear after real businesses register and subscribe.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Businesses" value="0" note="No registrations yet" icon={Building2} />
        <MetricCard title="Active Subscriptions" value="0" note="No active plans" icon={CreditCard} tone="green" />
        <MetricCard title="Trial Users" value="0" note="No trials started" icon={Timer} tone="amber" />
        <MetricCard title="Platform Revenue" value="GHS 0" note="No payments yet" icon={Wallet} tone="purple" />
      </div>
      <Card>
        <CardContent>
          <EmptyState title="No platform activity yet" text="Business registrations, subscription payments, support messages, and audit logs will appear here once users start using the system." />
        </CardContent>
      </Card>
    </section>
  );
}
