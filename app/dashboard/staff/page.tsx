import { ModulePage } from "@/components/dashboard/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function StaffPage() {
  return (
    <ModulePage title="Staff" description="Add staff, assign roles, set permissions, disable accounts, and view performance." action="Add Staff">
      <Card>
        <CardContent>
          <EmptyState title="No staff added yet" text="Staff accounts and role assignments will appear here after the business owner creates them." />
        </CardContent>
      </Card>
    </ModulePage>
  );
}
