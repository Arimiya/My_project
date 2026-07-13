import { ShoppingBag } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3 font-bold text-slate-950">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-blue-600/20">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span>PosSuite</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="/features">Features</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LinkButton href="/login" variant="secondary" className="h-9 px-3 sm:h-10 sm:px-4">Login</LinkButton>
          <LinkButton href="/register" className="h-9 px-3 sm:h-10 sm:px-4">Register</LinkButton>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 text-sm font-medium text-slate-600 sm:px-6 md:hidden">
        {[
          ["Features", "/features"],
          ["Pricing", "/pricing"],
          ["About", "/about"],
          ["Contact", "/contact"]
        ].map(([label, href]) => (
          <a key={href} href={href} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
