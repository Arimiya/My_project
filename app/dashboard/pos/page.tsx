import { CreditCard, Printer, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { demoProducts } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function POSPage() {
  const cart = demoProducts.slice(0, 4);
  const hasCartItems = cart.length > 0;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = hasCartItems ? 0 : 0;
  const tax = hasCartItems ? subtotal * 0.075 : 0;
  const total = hasCartItems ? subtotal + tax - discount : 0;
  return (
    <section className="grid gap-5 xl:grid-cols-[1.35fr_0.75fr]">
      <div>
        <div className="professional-card mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">POS checkout</p>
            <h1 className="mt-1 text-2xl font-bold">New Sale</h1>
            <p className="text-sm text-slate-500">Search by product name, SKU, category, or barcode.</p>
          </div>
          <div className="flex gap-2"><Button variant="secondary">Hold Sale</Button><Button variant="danger">Clear Cart</Button></div>
        </div>
        <Card>
          <CardContent>
            <label className="input-shell mb-5 flex h-12 items-center gap-3 rounded-xl px-3 text-slate-500"><Search className="h-4 w-4" /><input className="w-full bg-transparent outline-none" placeholder="Scan barcode or search product..." /></label>
            <div className="grid gap-3 md:grid-cols-2">
              {demoProducts.length === 0 ? (
                <div className="md:col-span-2">
                  <EmptyState title="No products uploaded yet" text="Add products before using the POS checkout screen." />
                </div>
              ) : demoProducts.map((product) => (
                <button key={product.sku} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:shadow-lg">
                  <strong className="text-slate-950">{product.name}</strong>
                  <p className="mt-1 text-sm text-slate-500">{product.sku} - {product.category}</p>
                  <div className="mt-3 flex items-center justify-between"><Badge tone={product.stock < 10 ? "amber" : "green"}>{product.stock} in stock</Badge><span className="font-bold">{formatCurrency(product.price)}</span></div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="self-start xl:sticky xl:top-24">
        <CardHeader><h2 className="font-semibold">Cart Summary</h2><Badge tone="blue">{cart.length} Items</Badge></CardHeader>
        <CardContent className="space-y-4">
          {cart.length === 0 ? <EmptyState title="Cart is empty" text="Products added from the POS screen will appear here." /> : cart.map((item) => (
            <div key={item.sku} className="flex items-center justify-between gap-3 border-b pb-3">
              <div><strong>{item.name}</strong><p className="text-sm text-slate-500">{formatCurrency(item.price)} x 1</p></div>
              <div className="flex items-center gap-2"><select className="input-shell rounded-lg px-2 py-1"><option>1</option><option>2</option></select><Trash2 className="h-4 w-4 text-red-500" /></div>
            </div>
          ))}
          {hasCartItems ? (
            <>
              <select className="input-shell h-12 w-full rounded-xl px-3"><option>Walk-in Customer</option></select>
              <div className="grid grid-cols-2 gap-2">
                <input className="input-shell h-12 rounded-xl px-3" placeholder="Discount" defaultValue="0" />
                <input className="input-shell h-12 rounded-xl px-3" placeholder="Tax %" defaultValue="7.5" />
              </div>
              <select className="input-shell h-12 w-full rounded-xl px-3"><option>Cash</option><option>MTN Mobile Money</option><option>Telecel Cash</option><option>AirtelTigo Money</option><option>Card</option><option>Bank Transfer</option><option>Split Payment</option></select>
              <input className="input-shell h-12 w-full rounded-xl px-3" placeholder="Payment reference for MoMo/Card/Transfer" />
            </>
          ) : (
            <EmptyState title="Checkout locked" text="No products or sales have been added yet. Add products first before completing a sale." />
          )}
          <dl className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Discount</dt><dd>-{formatCurrency(discount)}</dd></div>
            <div className="flex justify-between"><dt>Tax</dt><dd>{formatCurrency(tax)}</dd></div>
            <div className="flex justify-between border-t pt-3 text-lg font-bold"><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
          </dl>
          <Button className="w-full" disabled={!hasCartItems}><CreditCard className="mr-2 h-4 w-4" />Complete Sale</Button>
          <Button variant="secondary" className="w-full" disabled={!hasCartItems}><Printer className="mr-2 h-4 w-4" />Print / Download Receipt</Button>
        </CardContent>
      </Card>
    </section>
  );
}
