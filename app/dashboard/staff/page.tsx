import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const staff = ["Business Owner", "Manager", "Cashier", "Inventory Officer", "Accountant"];
export default function StaffPage() {
  return <ModulePage title="Staff" description="Add staff, assign roles, set permissions, disable accounts, and view performance." action="Add Staff"><Card><CardContent className="grid gap-3 md:grid-cols-5">{staff.map((role) => <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" key={role}><strong>{role}</strong><Badge className="mt-3" tone="blue">RBAC</Badge></div>)}</CardContent></Card></ModulePage>;
}
