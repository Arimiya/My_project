import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";

const settings = ["Business profile", "Business logo", "Receipt settings", "Tax settings", "Currency settings", "Branch settings", "User profile", "Password change", "Notification settings"];
export default function SettingsPage() {
  return <ModulePage title="Settings" description="Configure business profile, receipt, tax, currency, branches, users, and notifications." action="Save Settings"><Card><CardContent className="grid gap-3 md:grid-cols-3">{settings.map((s) => <div className="rounded-lg border bg-slate-50 p-4" key={s}>{s}</div>)}</CardContent></Card></ModulePage>;
}

