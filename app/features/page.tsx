import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Boxes, CreditCard, FileClock, ShieldCheck, ShoppingCart, Users } from "lucide-react";

const icons = [ShoppingCart, Boxes, Users, ShieldCheck, BarChart3, CreditCard, FileClock, Boxes];
const items = ["POS checkout", "Inventory", "Customers", "Staff roles", "Reports", "Subscriptions", "Audit logs", "Multi-branch support"];

export default function FeaturesPage() {
  return (
    <>
      <PublicNav />
      <main className="app-page px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
        <Badge tone="blue">Complete POS platform</Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Professional tools for daily business operations.</h1>
        <p className="mt-4 max-w-2xl text-slate-600">A complete business management platform for SMEs, designed with secure SaaS structure and responsive dashboards.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Card key={item}>
                <CardContent>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600"><Icon className="h-6 w-6" /></span>
                  <h2 className="mt-4 font-semibold">{item}</h2>
                  <p className="mt-2 text-sm text-slate-500">Production-ready module with clean UI, secure API structure, empty states, and responsive layouts.</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        </section>
      </main>
    </>
  );
}
