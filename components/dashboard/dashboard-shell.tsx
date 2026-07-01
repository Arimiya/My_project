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
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col bg-slate-950 p-4 text-white lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-3 px-2">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600">
            <Home className="h-5 w-5" />
          </span>
          <span>
            <strong className="block text-lg">PosSuite</strong>
            <small className="text-slate-400">Smart POS for SMEs</small>
          </span>
        </Link>
        <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-5 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 p-4">
          <h3 className="font-semibold">Upgrade your business</h3>
          <p className="mt-1 text-sm text-blue-100">Unlock premium inventory, analytics, and multi-branch tools.</p>
          <Link href="/dashboard/subscription" className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg bg-white text-sm font-semibold text-brand-700">Upgrade Plan</Link>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Demo Retail Store</p>
            <h1 className="text-lg font-bold text-slate-950">Business Workspace</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 md:block">Search anything...</div>
            <Bell className="h-5 w-5 text-slate-500" />
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">DS</div>
          </div>
        </header>
        <main className="p-4 pb-24 sm:p-6">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-40 flex gap-2 overflow-x-auto border-t border-slate-200 bg-white p-2 lg:hidden">
          {nav.slice(0, 8).map(([label, href, Icon]) => (
            <Link key={href} href={href} className="flex min-w-20 flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium text-slate-600">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

