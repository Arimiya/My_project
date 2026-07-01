import { CreditCard, Printer, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { demoProducts } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function POSPage() {
  const cart = demoProducts.slice(0, 4);
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.075;
  const discount = 10;
  const total = subtotal + tax - discount;
  return (
    <section className="grid gap-4 xl:grid-cols-[1.35fr_0.75fr]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div><h1 className="text-2xl font-bold">New Sale</h1><p className="text-sm text-slate-500">Search by product name, SKU, category, or barcode.</p></div>
          <div className="flex gap-2"><Button variant="secondary">Hold Sale</Button><Button variant="danger">Clear Cart</Button></div>
        </div>
        <Card>
          <CardContent>
            <label className="mb-4 flex h-11 items-center gap-2 rounded-lg border px-3 text-slate-500"><Search className="h-4 w-4" /><input className="w-full outline-none" placeholder="Scan barcode or search product..." /></label>
            <div className="grid gap-3 md:grid-cols-2">
              {demoProducts.map((product) => (
                <button key={product.sku} className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-brand-50">
                  <strong>{product.name}</strong>
                  <p className="mt-1 text-sm text-slate-500">{product.sku} • {product.category}</p>
                  <div className="mt-3 flex items-center justify-between"><Badge tone={product.stock < 10 ? "amber" : "green"}>{product.stock} in stock</Badge><span className="font-bold">{formatCurrency(product.price)}</span></div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="self-start">
        <CardHeader><h2 className="font-semibold">Cart Summary</h2><Badge tone="blue">{cart.length} Items</Badge></CardHeader>
        <CardContent className="space-y-4">
          {cart.map((item) => (
            <div key={item.sku} className="flex items-center justify-between gap-3 border-b pb-3">
              <div><strong>{item.name}</strong><p className="text-sm text-slate-500">{formatCurrency(item.price)} x 1</p></div>
              <div className="flex items-center gap-2"><select className="rounded border px-2 py-1"><option>1</option><option>2</option></select><Trash2 className="h-4 w-4 text-red-500" /></div>
            </div>
          ))}
          <select className="h-11 w-full rounded-lg border px-3"><option>Walk-in Customer</option><option>John Doe</option></select>
          <div className="grid grid-cols-2 gap-2">
            <input className="h-11 rounded-lg border px-3" placeholder="Discount" defaultValue="10" />
            <input className="h-11 rounded-lg border px-3" placeholder="Tax %" defaultValue="7.5" />
          </div>
          <select className="h-11 w-full rounded-lg border px-3"><option>Cash</option><option>MTN Mobile Money</option><option>Telecel Cash</option><option>AirtelTigo Money</option><option>Card</option><option>Bank Transfer</option><option>Split Payment</option></select>
          <input className="h-11 w-full rounded-lg border px-3" placeholder="Payment reference for MoMo/Card/Transfer" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Discount</dt><dd>-{formatCurrency(discount)}</dd></div>
            <div className="flex justify-between"><dt>Tax</dt><dd>{formatCurrency(tax)}</dd></div>
            <div className="flex justify-between border-t pt-3 text-lg font-bold"><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
          </dl>
          <Button className="w-full"><CreditCard className="mr-2 h-4 w-4" />Complete Sale</Button>
          <Button variant="secondary" className="w-full"><Printer className="mr-2 h-4 w-4" />Print / Download Receipt</Button>
        </CardContent>
      </Card>
    </section>
  );
}

