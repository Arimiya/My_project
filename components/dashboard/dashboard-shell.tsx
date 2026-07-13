import Link from "next/link";
import { ReactNode } from "react";
import {
  BarChart3,
  Bell,
  Boxes,
  Building2,
  ClipboardList,
  CreditCard,
  FileClock,
  Home,
  LayoutDashboard,
  Package,
  ReceiptText,
  Search,
  Settings,
  ShoppingCart,
  Users,
  WalletCards
} from "lucide-react";

const nav = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["POS", "/dashboard/pos", ShoppingCart],
  ["Products", "/dashboard/products", Package],
  ["Categories", "/dashboard/categories", Boxes],
  ["Inventory", "/dashboard/inventory", ClipboardList],
  ["Sales", "/dashboard/sales", ReceiptText],
  ["Customers", "/dashboard/customers", Users],
  ["Suppliers", "/dashboard/suppliers", Building2],
  ["Expenses", "/dashboard/expenses", WalletCards],
  ["Reports", "/dashboard/reports", BarChart3],
  ["Staff", "/dashboard/staff", Users],
  ["Subscription", "/dashboard/subscription", CreditCard],
  ["Notifications", "/dashboard/notifications", Bell],
  ["Audit Logs", "/dashboard/audit-logs", FileClock],
  ["Settings", "/dashboard/settings", Settings]
] as const;

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-page min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-white/10 bg-[linear-gradient(180deg,var(--sidebar),var(--sidebar-2))] p-4 text-white shadow-2xl lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 shadow-lg shadow-blue-600/30">
            <Home className="h-5 w-5" />
          </span>
          <span>
            <strong className="block text-lg">PosSuite</strong>
            <small className="text-slate-400">Smart POS for SMEs</small>
          </span>
        </Link>
        <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 p-4 shadow-xl shadow-blue-950/30">
          <h3 className="font-semibold">Upgrade your business</h3>
          <p className="mt-1 text-sm text-blue-100">Unlock premium inventory, analytics, and multi-branch tools.</p>
          <Link href="/dashboard/subscription" className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-brand-700 shadow-sm">Upgrade Plan</Link>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/85 px-3 backdrop-blur-xl sm:px-4 lg:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Demo Retail Store</p>
            <h1 className="truncate text-base font-bold text-slate-950 sm:text-lg">Business Workspace</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="input-shell hidden h-10 w-56 items-center gap-2 rounded-xl px-3 text-sm text-slate-500 xl:flex">
              <Search className="h-4 w-4" />
              Search anything...
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm sm:gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white">DS</div>
              <div className="hidden max-w-28 pr-2 text-sm md:block">
                <strong className="block truncate leading-4">Demo Store</strong>
                <span className="text-xs text-slate-500">Owner</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-3 pb-28 sm:p-5 lg:p-6">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-40 flex gap-2 overflow-x-auto border-t border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href} className="flex min-w-[5.25rem] flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700">
              <Icon className="h-4 w-4" />
              <span className="max-w-20 truncate">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
