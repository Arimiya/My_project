import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";

const items = ["POS checkout", "Inventory", "Customers", "Staff roles", "Reports", "Subscriptions", "Audit logs", "Multi-branch support"];

export default function FeaturesPage() {
  return (
    <>
      <PublicNav />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-bold">Features</h1>
        <p className="mt-3 max-w-2xl text-slate-600">A complete business management platform for SMEs.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {items.map((item) => <Card key={item}><CardContent><h2 className="font-semibold">{item}</h2><p className="mt-2 text-sm text-slate-500">Production-ready module with clean UI and secure API structure.</p></CardContent></Card>)}
        </div>
      </main>
    </>
  );
}

