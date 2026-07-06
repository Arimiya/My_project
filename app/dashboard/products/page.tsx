import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { demoProducts } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function ProductsPage() {
  return (
    <ModulePage title="Products" description="Add, edit, delete, import, and export products with SKU and barcode support." action="Add Product">
      <Card><CardContent className="overflow-x-auto">{demoProducts.length === 0 ? <EmptyState title="No products uploaded yet" text="Products will appear here after the business owner or inventory officer adds them." /> : <table className="w-full min-w-[760px] text-sm"><thead><tr className="text-left text-slate-500"><th className="py-3">Product</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{demoProducts.map((p) => <tr className="border-t" key={p.sku}><td className="py-3 font-medium">{p.name}</td><td>{p.sku}</td><td>{p.category}</td><td>{formatCurrency(p.price)}</td><td>{p.stock}</td><td><Badge tone={p.status === "In Stock" ? "green" : p.status === "Low Stock" ? "amber" : "red"}>{p.status}</Badge></td><td>Edit | Delete</td></tr>)}</tbody></table>}</CardContent></Card>
    </ModulePage>
  );
}
