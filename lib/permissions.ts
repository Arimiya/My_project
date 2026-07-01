export const roles = {
  super_admin: ["platform:*"],
  owner: ["business:*"],
  manager: ["sales:*", "inventory:*", "customers:*", "suppliers:*", "expenses:*", "reports:read", "staff:read"],
  cashier: ["pos:use", "sales:own", "customers:read"],
  inventory_officer: ["products:*", "inventory:*", "suppliers:read"],
  accountant: ["reports:read", "expenses:*", "sales:read"]
} as const;

export type RoleName = keyof typeof roles;

export function hasPermission(role: RoleName, permission: string) {
  return roles[role].some((item) => item === permission || item.endsWith(":*") && permission.startsWith(item.split(":")[0]));
}

