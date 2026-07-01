import { PublicNav } from "@/components/landing/public-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <PublicNav />
      <main className="grid min-h-[calc(100vh-73px)] place-items-center bg-slate-50 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardContent>
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="mt-1 text-sm text-slate-500">Use a demo account or your registered business account.</p>
            <form action="/api/auth/login" method="post" className="mt-6 space-y-3">
              <input name="email" type="email" required placeholder="Email" className="h-11 w-full rounded-lg border px-3" defaultValue="owner@demo.com" />
              <input name="password" type="password" required placeholder="Password" className="h-11 w-full rounded-lg border px-3" defaultValue="Owner12345" />
              <button className="h-11 w-full rounded-lg bg-brand-600 font-semibold text-white">Login</button>
            </form>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
              Demo: admin@possystem.com / Admin12345, owner@demo.com / Owner12345, cashier@demo.com / Cashier12345
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

