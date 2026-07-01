import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentSales } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function SalesPage() {
  return <ModulePage title="Sales" description="View sale details, invoices, cashiers, payments, refunds, and receipt reprints." action="Export Sales"><Card><CardContent className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><tbody>{recentSales.map((s) => <tr className="border-b" key={s.id}><td className="py-3 text-brand-600">{s.id}</td><td>{s.customer}</td><td>{s.date}</td><td>{s.payment}</td><td>{formatCurrency(s.total)}</td><td><Badge tone="green">{s.status}</Badge></td><td>Details | Refund | Reprint</td></tr>)}</tbody></table></CardContent></Card></ModulePage>;
}

