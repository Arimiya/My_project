import Link from "next/link";
import { ReactNode } from "react";
import { BarChart3, Building2, CreditCard, FileClock, LifeBuoy, Settings, Shield } from "lucide-react";

const nav = [
  ["Dashboard", "/super-admin", Shield],
  ["Businesses", "/super-admin/businesses", Building2],
  ["Plans", "/super-admin/subscription-plans", CreditCard],
  ["Payments", "/super-admin/payments", CreditCard],
  ["Reports", "/super-admin/platform-reports", BarChart3],
  ["Support", "/super-admin/support-messages", LifeBuoy],
  ["Audit Logs", "/super-admin/audit-logs", FileClock],
  ["Settings", "/super-admin/settings", Settings]
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-slate-950 p-4 text-white lg:block">
        <h1 className="px-3 text-xl font-bold">Platform Admin</h1>
        <nav className="mt-8 space-y-1">{nav.map(([label, href, Icon]) => <Link className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10" href={href} key={href}><Icon className="h-4 w-4" />{label}</Link>)}</nav>
      </aside>
      <main className="p-4 lg:pl-72">{children}</main>
    </div>
  );
}

