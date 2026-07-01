import { PublicNav } from "@/components/landing/public-nav";

export default function AboutPage() {
  return (
    <>
      <PublicNav />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold">About PosSuite</h1>
        <p className="mt-4 leading-8 text-slate-600">PosSuite is an academic final-year project designed as a real SaaS product for SMEs. It solves manual sales recording, poor inventory tracking, staff management difficulty, and weak business reporting through a subscription-based POS platform.</p>
      </main>
    </>
  );
}

