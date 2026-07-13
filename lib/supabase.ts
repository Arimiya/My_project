import { createClient } from "@supabase/supabase-js";

type JsonRecord = Record<string, unknown>;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required for Supabase database access`);
  return value;
}

export function getSupabaseAdmin() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export const resourceTableMap = {
  products: "products",
  categories: "categories",
  customers: "customers",
  suppliers: "suppliers",
  expenses: "expenses",
  inventory: "inventory_transactions",
  notifications: "notifications",
  "audit-logs": "audit_logs"
} as const;

export type ResourceName = keyof typeof resourceTableMap;

export function toSnakeRecord(record: JsonRecord) {
  const mappings: Record<string, string> = {
    businessId: "business_id",
    branchId: "branch_id",
    categoryId: "category_id",
    imageUrl: "image_url",
    buyingPrice: "buying_price",
    sellingPrice: "selling_price",
    stockQuantity: "stock_quantity",
    reorderLevel: "reorder_level",
    productId: "product_id",
    userId: "user_id",
    entityId: "entity_id",
    expenseDate: "expense_date",
    productsSupplied: "products_supplied",
    amountOwed: "amount_owed",
    paymentStatus: "payment_status"
  };

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [mappings[key] ?? key, value])
  );
}
