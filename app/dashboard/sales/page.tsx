import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { recentSales } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function SalesPage() {
  return (
    <ModulePage title="Sales" description="View sale details, invoices, cashiers, payments, refunds, and receipt reprints." action="Export Sales">
      <Card>
        <CardContent className="overflow-x-auto">
          {recentSales.length === 0 ? (
            <EmptyState title="No sales have been made" text="Sales, invoices, payments, refunds, and receipt reprints will appear after checkout transactions are completed." />
          ) : (
            <table className="w-full min-w-[760px] text-sm">
              <tbody>
                {recentSales.map((sale) => (
                  <tr className="border-b" key={sale.id}>
                    <td className="py-3 text-brand-600">{sale.id}</td>
                    <td>{sale.customer}</td>
                    <td>{sale.date}</td>
                    <td>{sale.payment}</td>
                    <td>{formatCurrency(sale.total)}</td>
                    <td><Badge tone="green">{sale.status}</Badge></td>
                    <td>Details | Refund | Reprint</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </ModulePage>
  );
}
