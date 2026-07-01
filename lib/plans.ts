export type PlanKey = "trial" | "basic" | "pro" | "enterprise";

export const subscriptionPlans = [
  {
    key: "trial",
    name: "Free Trial",
    price: 0,
    durationDays: 14,
    audience: "New SMEs testing the platform",
    limits: { branches: 1, users: 2, products: 50 },
    features: ["1 branch", "1 admin", "1 cashier", "Limited products", "Basic sales", "Basic reports"]
  },
  {
    key: "basic",
    name: "Basic",
    price: 99,
    durationDays: 30,
    audience: "Small shops",
    limits: { branches: 1, users: 3, products: 500 },
    features: ["1 branch", "3 users", "Products and inventory", "POS sales screen", "Customers", "Receipt printing"]
  },
  {
    key: "pro",
    name: "Pro",
    price: 249,
    durationDays: 30,
    audience: "Growing SMEs",
    limits: { branches: 3, users: 15, products: 5000 },
    features: ["Multiple users", "Advanced inventory", "Low stock alerts", "Suppliers", "Expenses", "Analytics", "Report exports"]
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: 699,
    durationDays: 30,
    audience: "Multi-branch businesses",
    limits: { branches: 99, users: 99, products: 99999 },
    features: ["Multiple branches", "RBAC", "Multi-location inventory", "Advanced analytics", "Audit logs", "Backups", "Priority support"]
  }
] as const;

export function getPlan(key: string) {
  return subscriptionPlans.find((plan) => plan.key === key) ?? subscriptionPlans[0];
}
