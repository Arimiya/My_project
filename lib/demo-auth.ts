import type { RoleName } from "./permissions";

export const demoUsers: Record<
  string,
  {
    password: string;
    userId: string;
    businessId?: string;
    branchId?: string;
    role: RoleName;
    email: string;
    redirectTo: string;
  }
> = {
  "admin@possystem.com": {
    password: "Admin12345",
    userId: "000000000000000000000001",
    role: "super_admin",
    email: "admin@possystem.com",
    redirectTo: "/super-admin"
  },
  "owner@demo.com": {
    password: "Owner12345",
    userId: "000000000000000000000002",
    businessId: "000000000000000000000101",
    branchId: "000000000000000000000201",
    role: "owner",
    email: "owner@demo.com",
    redirectTo: "/dashboard"
  },
  "cashier@demo.com": {
    password: "Cashier12345",
    userId: "000000000000000000000003",
    businessId: "000000000000000000000101",
    branchId: "000000000000000000000201",
    role: "cashier",
    email: "cashier@demo.com",
    redirectTo: "/dashboard/pos"
  }
};

export function getDemoLogin(email: string, password: string) {
  const demoUser = demoUsers[email.toLowerCase()];
  if (!demoUser || demoUser.password !== password) return null;
  return demoUser;
}
