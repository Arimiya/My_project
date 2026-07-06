import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <>
      <PublicNav />
      <main className="app-page px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl">
          <Badge tone="blue">Final year project</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">About PosSuite</h1>
          <Card className="mt-8">
            <CardContent className="p-8">
              <p className="leading-8 text-slate-600">PosSuite is an academic final-year project designed as a real SaaS product for SMEs. It solves manual sales recording, poor inventory tracking, staff management difficulty, and weak business reporting through a subscription-based POS platform.</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {["Affordable subscription access", "Professional POS workflows", "Secure multi-tenant data"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-800">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
