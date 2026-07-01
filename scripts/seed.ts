import { connectDB } from "../lib/db";
import { hashPassword } from "../lib/auth";
import { subscriptionPlans } from "../lib/plans";
import {
  AuditLog,
  Branch,
  Business,
  Category,
  Customer,
  Expense,
  InventoryTransaction,
  Notification,
  Payment,
  Product,
  ReceiptSetting,
  Sale,
  StaffRole,
  Subscription,
  SubscriptionPlan,
  Supplier,
  User
} from "../models";

async function reset() {
  await Promise.all([
    AuditLog.deleteMany({}),
    Branch.deleteMany({}),
    Business.deleteMany({}),
    Category.deleteMany({}),
    Customer.deleteMany({}),
    Expense.deleteMany({}),
    InventoryTransaction.deleteMany({}),
    Notification.deleteMany({}),
    Payment.deleteMany({}),
    Product.deleteMany({}),
    ReceiptSetting.deleteMany({}),
    Sale.deleteMany({}),
    StaffRole.deleteMany({}),
    Subscription.deleteMany({}),
    SubscriptionPlan.deleteMany({}),
    Supplier.deleteMany({}),
    User.deleteMany({})
  ]);
}

async function main() {
  await connectDB();
  await reset();

  await SubscriptionPlan.insertMany(
    subscriptionPlans.map((plan) => ({
      key: plan.key,
      name: plan.name,
      price: plan.price,
      durationDays: plan.durationDays,
      features: plan.features,
      limits: plan.limits,
      active: true
    }))
  );

  const business = await Business.create({
    name: "Demo Retail Store",
    type: "Retail",
    location: "Accra, Ghana",
    phone: "+233 24 000 0000",
    email: "owner@demo.com",
    currency: "GHS",
    taxRate: 12.5,
    status: "active"
  });

  const branch = await Branch.create({
    businessId: business._id,
    name: "Main Branch",
    location: "Accra Central",
    phone: "+233 24 000 0000"
  });

  await User.insertMany([
    {
      fullName: "Platform Admin",
      email: "admin@possystem.com",
      phone: "+233 20 000 0000",
      passwordHash: await hashPassword("Admin12345"),
      role: "super_admin",
      active: true
    },
    {
      businessId: business._id,
      branchId: branch._id,
      fullName: "Demo Owner",
      email: "owner@demo.com",
      phone: "+233 24 111 1111",
      passwordHash: await hashPassword("Owner12345"),
      role: "owner",
      active: true
    },
    {
      businessId: business._id,
      branchId: branch._id,
      fullName: "Demo Cashier",
      email: "cashier@demo.com",
      phone: "+233 24 222 2222",
      passwordHash: await hashPassword("Cashier12345"),
      role: "cashier",
      active: true
    }
  ]);

  const categories = await Category.insertMany([
    { businessId: business._id, branchId: branch._id, name: "Electronics" },
    { businessId: business._id, branchId: branch._id, name: "Accessories" },
    { businessId: business._id, branchId: branch._id, name: "Groceries" }
  ]);

  const products = await Product.insertMany([
    { businessId: business._id, branchId: branch._id, categoryId: categories[0]._id, name: "Wireless Headphones", sku: "WH-001", barcode: "100000001", buyingPrice: 240, sellingPrice: 399, stockQuantity: 45, reorderLevel: 8 },
    { businessId: business._id, branchId: branch._id, categoryId: categories[0]._id, name: "Smart Watch", sku: "SW-002", barcode: "100000002", buyingPrice: 300, sellingPrice: 520, stockQuantity: 30, reorderLevel: 10 },
    { businessId: business._id, branchId: branch._id, categoryId: categories[1]._id, name: "USB Cable", sku: "UC-005", barcode: "100000005", buyingPrice: 18, sellingPrice: 45, stockQuantity: 0, reorderLevel: 12 },
    { businessId: business._id, branchId: branch._id, categoryId: categories[2]._id, name: "Premium Rice 5kg", sku: "GR-010", barcode: "100000010", buyingPrice: 70, sellingPrice: 95, stockQuantity: 18, reorderLevel: 20 }
  ]);

  const customers = await Customer.insertMany([
    { businessId: business._id, branchId: branch._id, name: "John Doe", phone: "+233 54 100 1000", email: "john@example.com", loyaltyPoints: 120 },
    { businessId: business._id, branchId: branch._id, name: "Ama Mensah", phone: "+233 54 200 2000", email: "ama@example.com", loyaltyPoints: 80 }
  ]);

  await Promise.all([
    Supplier.create({ businessId: business._id, branchId: branch._id, name: "Accra Wholesale Hub", phone: "+233 30 200 0000", email: "sales@wholesale.test", address: "Makola, Accra", productsSupplied: ["Electronics", "Accessories"], amountOwed: 1500, paymentStatus: "partial" }),
    Expense.create({ businessId: business._id, branchId: branch._id, category: "Rent", amount: 2500, note: "Monthly shop rent", expenseDate: new Date() }),
    Subscription.create({ businessId: business._id, planKey: "pro", status: "active", startDate: new Date(), expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }),
    Payment.create({ businessId: business._id, amount: 199, currency: "GHS", gateway: "paystack", reference: "DEMO-PAY-001", status: "success", paidAt: new Date() }),
    ReceiptSetting.create({ businessId: business._id, logoUrl: "", footerMessage: "Thank you for shopping with us.", showTax: true, showCashier: true })
  ]);

  await Sale.create({
    businessId: business._id,
    branchId: branch._id,
    invoiceNumber: "INV-DEMO-001",
    cashierId: null,
    customerId: customers[0]._id,
    items: [
      { productId: products[0]._id, name: products[0].name, quantity: 1, unitPrice: products[0].sellingPrice, discount: 0, tax: 49.88, total: 448.88 },
      { productId: products[2]._id, name: products[2].name, quantity: 2, unitPrice: products[2].sellingPrice, discount: 0, tax: 11.25, total: 101.25 }
    ],
    subtotal: 489,
    discount: 0,
    tax: 61.13,
    total: 550.13,
    paymentMethod: "Mobile Money",
    paymentReference: "MTN-DEMO-001",
    status: "completed"
  });

  await Notification.insertMany([
    { businessId: business._id, branchId: branch._id, title: "Low stock alert", message: "Premium Rice 5kg is below reorder level.", type: "low_stock" },
    { businessId: business._id, branchId: branch._id, title: "Subscription active", message: "Your Pro plan is active for 30 days.", type: "subscription" }
  ]);

  await AuditLog.create({ businessId: business._id, userId: null, action: "seed.completed", entity: "System", metadata: { source: "scripts/seed.ts" } });

  console.log("Seed completed.");
  console.log("Super Admin: admin@possystem.com / Admin12345");
  console.log("Business Owner: owner@demo.com / Owner12345");
  console.log("Cashier: cashier@demo.com / Cashier12345");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
