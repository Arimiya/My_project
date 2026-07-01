import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";

const reports = ["Daily sales", "Weekly sales", "Monthly sales", "Yearly sales", "Profit and loss", "Inventory", "Low stock", "Best-selling products", "Worst-selling products", "Sales by cashier", "Sales by payment method", "Customer purchases", "Expenses", "PDF export", "CSV export"];
export default function ReportsPage() {
  return <ModulePage title="Reports" description="Business insights, sales reporting, inventory analytics, and exportable reports." action="Export Report"><Card><CardContent className="grid gap-3 md:grid-cols-3">{reports.map((r) => <div className="rounded-lg border bg-white p-4 font-medium" key={r}>{r}</div>)}</CardContent></Card></ModulePage>;
}

