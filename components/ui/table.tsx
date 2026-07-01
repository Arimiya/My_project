import { cn } from "@/lib/utils";
import type { TableHTMLAttributes } from "react";

export function DataTable({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full min-w-[720px] border-collapse text-sm", className)} {...props} />;
}

