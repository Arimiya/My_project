import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ title, value, note, icon: Icon, tone = "blue" }: { title: string; value: string; note: string; icon: LucideIcon; tone?: "blue" | "green" | "amber" | "purple" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-violet-50 text-violet-600"
  };
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <strong className="mt-2 block text-2xl text-slate-950">{value}</strong>
          <small className="mt-1 block text-emerald-600">{note}</small>
        </div>
        <span className={`grid h-12 w-12 place-items-center rounded-full ${tones[tone]}`}>
          <Icon className="h-6 w-6" />
        </span>
      </CardContent>
    </Card>
  );
}

