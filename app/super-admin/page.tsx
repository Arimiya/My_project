import { MetricCard } from "@/components/dashboard/metric-card";
import { Building2, CreditCard, Timer, Wallet } from "lucide-react";
export default function SuperAdminPage() { return <section className="space-y-6"><h1 className="text-2xl font-bold">Super Admin Dashboard</h1><div className="grid gap-4 md:grid-cols-4"><MetricCard title="Businesses" value="248" note="Registered" icon={Building2} /><MetricCard title="Active Subscriptions" value="186" note="Currently active" icon={CreditCard} tone="green" /><MetricCard title="Trial Users" value="32" note="14-day trials" icon={Timer} tone="amber" /><MetricCard title="Platform Revenue" value="GHS 84,920" note="This month" icon={Wallet} tone="purple" /></div></section>; }

