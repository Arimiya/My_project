import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export function ModulePage({ title, description, action = "Add New", children }: { title: string; description: string; action?: string; children?: ReactNode }) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <Button>{action}</Button>
      </div>
      {children ?? (
        <Card>
          <CardHeader><h2 className="font-semibold">{title} records</h2></CardHeader>
          <CardContent><EmptyState title={`No ${title.toLowerCase()} yet`} text="Use the action button to create your first record. Delete actions should use confirmation modals in production workflows." /></CardContent>
        </Card>
      )}
    </section>
  );
}

