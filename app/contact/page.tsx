import { PublicNav } from "@/components/landing/public-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <>
      <PublicNav />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold">Contact</h1>
        <Card className="mt-8"><CardContent><input className="mb-3 h-11 w-full rounded-lg border px-3" placeholder="Full name" /><input className="mb-3 h-11 w-full rounded-lg border px-3" placeholder="Email" /><textarea className="mb-3 min-h-32 w-full rounded-lg border p-3" placeholder="Message" /><Button>Send Message</Button></CardContent></Card>
      </main>
    </>
  );
}

