import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { invoiceNumber } from "@/lib/utils";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .eq("business_id", session.businessId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ sales: data ?? [] });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const body = await req.json();
  const items = Array.isArray(body.items) ? body.items : [];

  for (const item of items) {
    if (!item.productId) continue;
    const quantity = Number(item.quantity || 0);
    const { data: product } = await supabase
      .from("products")
      .select("stock_quantity")
      .eq("id", item.productId)
      .eq("business_id", session.businessId)
      .single();

    if (product) {
      await supabase
        .from("products")
        .update({ stock_quantity: Number(product.stock_quantity || 0) - quantity })
        .eq("id", item.productId)
        .eq("business_id", session.businessId);

      await supabase.from("inventory_transactions").insert({
        business_id: session.businessId,
        branch_id: session.branchId,
        product_id: item.productId,
        type: "stock_out",
        quantity,
        note: "Stock deducted after POS sale",
        performed_by: session.userId
      });
    }
  }

  const { data: sale, error } = await supabase
    .from("sales")
    .insert({
      business_id: session.businessId,
      branch_id: session.branchId,
      cashier_id: session.userId,
      customer_id: body.customerId || null,
      invoice_number: invoiceNumber(),
      items,
      subtotal: Number(body.subtotal || 0),
      discount: Number(body.discount || 0),
      tax: Number(body.tax || 0),
      total: Number(body.total || 0),
      payment_method: body.paymentMethod,
      payment_reference: body.paymentReference,
      status: body.status || "completed"
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  await supabase.from("audit_logs").insert({
    business_id: session.businessId,
    user_id: session.userId,
    action: "sale:completed",
    entity: "Sale",
    entity_id: sale.id
  });

  return NextResponse.json({ sale }, { status: 201 });
}
