import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
const logs = ["User login", "Product created", "Sale completed", "Stock adjusted", "Subscription changed"];
export default function AuditLogsPage() { return <ModulePage title="Audit Logs" description="Track important business actions for accountability and security." action="Export Logs"><Card><CardContent className="space-y-3">{logs.map((l) => <p className="rounded-lg border p-3 text-sm" key={l}>{l} • Demo user • Just now</p>)}</CardContent></Card></ModulePage>; }

