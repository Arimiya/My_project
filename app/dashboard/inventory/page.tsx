import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";

const actions = ["Stock in", "Stock out", "Stock adjustment", "Damaged goods", "Returned goods", "Low stock alert", "Supplier purchase", "Branch transfer"];
export default function InventoryPage() {
  return <ModulePage title="Inventory" description="Track stock movement, returns, damaged goods, and multi-branch inventory." action="Record Stock Movement"><Card><CardContent className="grid gap-3 md:grid-cols-4">{actions.map((a) => <div key={a} className="rounded-lg border bg-slate-50 p-4 font-semibold">{a}</div>)}</CardContent></Card></ModulePage>;
}

