import { Inbox } from "lucide-react";
import { Card } from "./card";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <Card className="grid min-h-44 place-items-center border-dashed">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-500">
          <Inbox className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{text}</p>
      </div>
    </Card>
  );
}

