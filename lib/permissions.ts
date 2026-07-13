export const roles = {
  super_admin: ["platform:*"],
  owner: ["business:*"],
  manager: ["pos:use", "sales:*", "products:*", "inventory:*", "customers:*", "suppliers:*", "expenses:*", "reports:read", "staff:read", "notifications:read", "audit_logs:read"],
  cashier: ["pos:use", "sales:own", "customers:read"],
  inventory_officer: ["products:*", "inventory:*", "suppliers:read"],
  accountant: ["reports:read", "expenses:*", "sales:read"]
} as const;

export type RoleName = keyof typeof roles;

export function hasPermission(role: RoleName, permission: string) {
  return roles[role].some((item) => {
    if (item === "platform:*" || item === "business:*") return true;
    return item === permission || item.endsWith(":*") && permission.startsWith(item.split(":")[0]);
  });
}
