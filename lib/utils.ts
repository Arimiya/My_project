import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "GHS") {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function isExpired(date?: Date | string | null) {
  if (!date) return false;
  return new Date(date).getTime() < Date.now();
}

export function invoiceNumber(prefix = "INV") {
  return `${prefix}-${Date.now().toString().slice(-8)}`;
}

