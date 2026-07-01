import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { AuditLog, Category, Customer, Expense, InventoryTransaction, Product, Supplier } from "@/models";

const resourceMap = {
  products: Product,
  categories: Category,
  customers: Customer,
  suppliers: Supplier,
  expenses: Expense,
  inventory: InventoryTransaction
} as const;

type ResourceName = keyof typeof resourceMap;

function getModel(resource: string) {
  return resourceMap[resource as ResourceName];
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const Model = getModel(resource);
  if (!Model) return NextResponse.json({ message: "Unknown resource" }, { status: 404 });
  await connectDB();
  const records = await Model.find({ businessId: session.businessId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ records });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const Model = getModel(resource);
  if (!Model) return NextResponse.json({ message: "Unknown resource" }, { status: 404 });
  await connectDB();
  const body = await req.json();
  const record = await Model.create({ ...body, businessId: session.businessId, branchId: body.branchId || session.branchId });
  await AuditLog.create({ businessId: session.businessId, userId: session.userId, action: `${resource}:created`, entity: resource, entityId: String(record._id) });
  return NextResponse.json({ record }, { status: 201 });
}
