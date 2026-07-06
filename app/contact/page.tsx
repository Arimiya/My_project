import { PublicNav } from "@/components/landing/public-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <>
      <PublicNav />
      <main className="app-page px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">Contact</h1>
          <p className="mt-3 text-slate-600">Send a message for product support, academic review, or platform enquiries.</p>
          <Card className="mt-8">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <input className="input-shell h-12 w-full rounded-xl px-3" placeholder="Full name" />
              <input className="input-shell h-12 w-full rounded-xl px-3" placeholder="Email" />
              <textarea className="input-shell min-h-36 w-full rounded-xl p-3" placeholder="Message" />
              <Button>Send Message</Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
