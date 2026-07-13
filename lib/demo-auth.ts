import type { RoleName } from "./permissions";

type DemoUser = {
  password: string;
  userId: string;
  businessId?: string;
  branchId?: string;
  role: RoleName;
  email: string;
  redirectTo: string;
};

function configuredDemoUsers(): Record<string, DemoUser> {
  if (process.env.ENABLE_DEMO_LOGIN !== "true") return {};

  const users: DemoUser[] = [
    {
      password: process.env.DEMO_ADMIN_PASSWORD || "",
      userId: "000000000000000000000001",
      role: "super_admin",
      email: process.env.DEMO_ADMIN_EMAIL || "",
      redirectTo: "/super-admin"
    },
    {
      password: process.env.DEMO_OWNER_PASSWORD || "",
      userId: "000000000000000000000002",
      businessId: "000000000000000000000101",
      branchId: "000000000000000000000201",
      role: "owner",
      email: process.env.DEMO_OWNER_EMAIL || "",
      redirectTo: "/dashboard"
    },
    {
      password: process.env.DEMO_CASHIER_PASSWORD || "",
      userId: "000000000000000000000003",
      businessId: "000000000000000000000101",
      branchId: "000000000000000000000201",
      role: "cashier",
      email: process.env.DEMO_CASHIER_EMAIL || "",
      redirectTo: "/dashboard/pos"
    }
  ] satisfies DemoUser[];

  const configuredUsers = users.filter((user) => user.email && user.password);

  return Object.fromEntries(configuredUsers.map((user) => [user.email.toLowerCase(), user]));
}

export function getDemoLogin(email: string, password: string) {
  const demoUser = configuredDemoUsers()[email.toLowerCase()];
  if (!demoUser || demoUser.password !== password) return null;
  return demoUser;
}
