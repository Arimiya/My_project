import { ClipboardList, PackagePlus, ShoppingCart, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { demoProducts, notifications, recentSales } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

const setupSteps = [
  ["Add your first product", "Upload products, prices, SKU, barcode, and stock quantity.", PackagePlus],
  ["Open the POS screen", "Start checkout only after products have been added.", ShoppingCart],
  ["Add customers or staff", "Create customer records and invite staff when your business is ready.", UserPlus]
] as const;

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Getting started</p>
            <h2 className="mt-1 font-semibold">Set up your business workspace</h2>
          </div>
          <Badge tone="blue">No uploads or sales yet</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {setupSteps.map(([title, text, Icon]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><h2 className="font-semibold">Product Activity</h2></CardHeader>
          <CardContent className="space-y-3">
            {demoProducts.length > 0 ? demoProducts.slice(0, 5).map((product) => (
              <div key={product.sku} className="flex items-center justify-between text-sm">
                <span>{product.name}</span>
                <strong>{formatCurrency(product.price * 120)}</strong>
              </div>
            )) : <EmptyState title="No products uploaded" text="Product activity will appear after products are added to the system." />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-semibold">Recent Sales</h2><a className="text-sm text-brand-600" href="/dashboard/sales">View All</a></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <tbody>{recentSales.map((sale) => <tr key={sale.id} className="border-b"><td className="py-3 text-brand-600">{sale.id}</td><td>{sale.customer}</td><td>{sale.date}</td><td>{sale.items}</td><td>{formatCurrency(sale.total)}</td><td><Badge tone="green">{sale.status}</Badge></td></tr>)}</tbody>
            </table>
            {recentSales.length === 0 ? <EmptyState title="No sales recorded yet" text="Completed POS transactions will appear here after your first sale." /> : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><h2 className="font-semibold">Alerts</h2></CardHeader>
          <CardContent className="space-y-3">{notifications.length > 0 ? notifications.map((item) => <p key={item} className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{item}</p>) : <EmptyState title="No alerts" text="Low stock, payment, and staff notifications will appear here." />}</CardContent>
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
