import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { invoiceNumber } from "@/lib/utils";
import { AuditLog, InventoryTransaction, Product, Sale } from "@/models";

export async function GET() {
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  await connectDB();
  const sales = await Sale.find({ businessId: session.businessId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ sales });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const items = Array.isArray(body.items) ? body.items : [];

  for (const item of items) {
    if (item.productId) {
      await Product.findOneAndUpdate(
        { _id: item.productId, businessId: session.businessId },
        { $inc: { stockQuantity: -Number(item.quantity || 0) } }
      );
      await InventoryTransaction.create({
        businessId: session.businessId,
        branchId: session.branchId,
        productId: item.productId,
        type: "stock_out",
        quantity: Number(item.quantity || 0),
        note: "Stock deducted after POS sale",
        performedBy: session.userId
      });
    }
  }

  const sale = await Sale.create({
    businessId: session.businessId,
    branchId: session.branchId,
    cashierId: session.userId,
    invoiceNumber: invoiceNumber(),
    ...body,
    items
  });
  await AuditLog.create({ businessId: session.businessId, userId: session.userId, action: "sale:completed", entity: "Sale", entityId: String(sale._id) });
  return NextResponse.json({ sale }, { status: 201 });
}

