import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function AuditLogsPage() {
  return (
    <ModulePage title="Audit Logs" description="Track important business actions for accountability and security." action="Export Logs">
      <Card>
        <CardContent>
          <EmptyState title="No audit activity yet" text="User logins, product changes, sales, stock adjustments, and subscription changes will appear here after they happen." />
        </CardContent>
      </Card>
    </ModulePage>
  );
}
