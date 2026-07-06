import Link from "next/link";
import { ReactNode } from "react";
import { BarChart3, Bell, Building2, CreditCard, FileClock, LifeBuoy, Search, Settings, Shield } from "lucide-react";

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
    <div className="app-page min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-[linear-gradient(180deg,var(--sidebar),var(--sidebar-2))] p-4 text-white shadow-2xl lg:block">
        <Link href="/super-admin" className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 shadow-lg shadow-blue-600/30">
            <Shield className="h-5 w-5" />
          </span>
          <span>
            <strong className="block text-lg">Platform Admin</strong>
            <small className="text-slate-400">PosSuite control center</small>
          </span>
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map(([label, href, Icon]) => (
            <Link className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white" href={href} key={href}>
              <Icon className="h-4 w-4" />{label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-xl sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Platform Owner</p>
            <h1 className="text-lg font-bold text-slate-950">Super Admin Workspace</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="input-shell hidden h-10 min-w-64 items-center gap-2 rounded-xl px-3 text-sm text-slate-500 md:flex">
              <Search className="h-4 w-4" />
              Search platform...
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm">
              <Bell className="h-5 w-5" />
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-sm font-bold text-white">SA</div>
          </div>
        </header>
        <main className="p-4 pb-24 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
