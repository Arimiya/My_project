import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";

const logs = ["User login", "Product created", "Sale completed", "Stock adjusted", "Subscription changed"];

export default function AuditLogsPage() {
  return (
    <ModulePage title="Audit Logs" description="Track important business actions for accountability and security." action="Export Logs">
      <Card>
        <CardContent className="space-y-3">
          {logs.map((log) => (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm" key={log}>
              <strong>{log}</strong>
              <span className="ml-2 text-slate-500">- Demo user - Just now</span>
            </p>
          ))}
        </CardContent>
      </Card>
    </ModulePage>
  );
}
