import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/lib/demo-data";
export default function NotificationsPage() { return <ModulePage title="Notifications" description="Low stock, subscription expiry, sale, payment, and staff alerts." action="Mark All Read"><Card><CardContent className="space-y-3">{notifications.map((n) => <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800" key={n}>{n}</p>)}</CardContent></Card></ModulePage>; }

