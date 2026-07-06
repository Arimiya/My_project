import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/lib/demo-data";
import { EmptyState } from "@/components/ui/empty-state";
export default function NotificationsPage() { return <ModulePage title="Notifications" description="Low stock, subscription expiry, sale, payment, and staff alerts." action="Mark All Read"><Card><CardContent className="space-y-3">{notifications.length === 0 ? <EmptyState title="No notifications yet" text="System alerts will appear here after products, sales, payments, or staff activity exist." /> : notifications.map((n) => <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800" key={n}>{n}</p>)}</CardContent></Card></ModulePage>; }
