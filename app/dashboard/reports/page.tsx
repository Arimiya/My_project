import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";

const reports = ["Daily sales", "Weekly sales", "Monthly sales", "Yearly sales", "Profit and loss", "Inventory", "Low stock", "Best-selling products", "Worst-selling products", "Sales by cashier", "Sales by payment method", "Customer purchases", "Expenses", "PDF export", "CSV export"];
export default function ReportsPage() {
  return <ModulePage title="Reports" description="Business insights, sales reporting, inventory analytics, and exportable reports." action="Export Report"><Card><CardContent className="grid gap-3 md:grid-cols-3">{reports.map((r) => <div className="rounded-2xl border border-slate-200 bg-white p-4 font-medium shadow-sm transition hover:border-brand-200 hover:bg-brand-50" key={r}>{r}</div>)}</CardContent></Card></ModulePage>;
}
