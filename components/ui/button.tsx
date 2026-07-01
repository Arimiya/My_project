import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const styles = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "border border-slate-200 bg-white text-slate-900 hover:border-brand-200 hover:bg-brand-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn("inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition", styles[variant], className)}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
};

export function LinkButton({ href, className, variant = "primary", children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={cn("inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition", styles[variant], className)} {...props}>
      {children}
    </Link>
  );
}

