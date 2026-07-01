import { AlertTriangle, Banknote, Package, Users, UserCheck, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { demoProducts, notifications, recentSales } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard title="Total Sales Today" value={formatCurrency(4562.35)} note="12.5% vs yesterday" icon={Banknote} />
        <MetricCard title="Revenue" value={formatCurrency(98765.4)} note="18.2% vs last month" icon={Wallet} tone="green" />
        <MetricCard title="Products" value="1,245" note="Total products" icon={Package} tone="purple" />
        <MetricCard title="Low Stock" value="32" note="Require attention" icon={AlertTriangle} tone="amber" />
        <MetricCard title="Customers" value="2,356" note="Total customers" icon={Users} />
        <MetricCard title="Active Staff" value="12" note="Currently active" icon={UserCheck} tone="green" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr_0.8fr]">
        <Card className="xl:col-span-1">
          <CardHeader><h2 className="font-semibold">Sales Analytics</h2><Badge tone="blue">This Month</Badge></CardHeader>
          <CardContent><SalesChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-semibold">Best Selling Products</h2></CardHeader>
          <CardContent className="space-y-3">
            {demoProducts.slice(0, 5).map((product) => (
              <div key={product.sku} className="flex items-center justify-between text-sm">
                <span>{product.name}</span>
                <strong>{formatCurrency(product.price * 120)}</strong>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-semibold">Inventory Summary</h2></CardHeader>
          <CardContent>
            <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border-[18px] border-emerald-500 text-center">
              <strong className="block text-2xl">1,245</strong>
              <small className="text-slate-500">Items</small>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <Card>
          <CardHeader><h2 className="font-semibold">Recent Sales</h2><a className="text-sm text-brand-600" href="/dashboard/sales">View All</a></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <tbody>{recentSales.map((sale) => <tr key={sale.id} className="border-b"><td className="py-3 text-brand-600">{sale.id}</td><td>{sale.customer}</td><td>{sale.date}</td><td>{sale.items}</td><td>{formatCurrency(sale.total)}</td><td><Badge tone="green">{sale.status}</Badge></td></tr>)}</tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-semibold">Alerts</h2></CardHeader>
          <CardContent className="space-y-3">{notifications.map((item) => <p key={item} className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{item}</p>)}</CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent>
            <Badge tone="green">Active</Badge>
            <h2 className="mt-4 text-xl font-bold">Pro Plan</h2>
            <p className="mt-1 text-sm text-slate-600">Expires July 16, 2026</p>
            <a href="/dashboard/subscription" className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white">Manage Subscription</a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

