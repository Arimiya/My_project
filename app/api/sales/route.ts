import { NextRequest, NextResponse } from "next/server";
import { invoiceNumber } from "@/lib/utils";
import { getSupabaseAdmin } from "@/lib/supabase";
import { assertSameOrigin, requireApiSession, safeErrorResponse } from "@/lib/api-security";
import { hasPermission } from "@/lib/permissions";
import { saleCreateSchema } from "@/lib/validation";

export async function GET() {
  const { session, response } = await requireApiSession();
  if (response) return response;
  if (!session?.businessId) return NextResponse.json({ message: "Business context is required" }, { status: 403 });

  const canReadAll = hasPermission(session.role, "sales:read") || hasPermission(session.role, "business:*");
  const canReadOwn = hasPermission(session.role, "sales:own");
  if (!canReadAll && !canReadOwn) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("sales")
    .select("*")
    .eq("business_id", session.businessId)
    .order("created_at", { ascending: false });

  if (!canReadAll) query = query.eq("cashier_id", session.userId);

  const { data, error } = await query;

  if (error) return safeErrorResponse();
  return NextResponse.json({ sales: data ?? [] });
}

export async function POST(req: NextRequest) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const { session, response } = await requireApiSession("pos:use");
  if (response) return response;
  if (!session?.businessId) return NextResponse.json({ message: "Business context is required" }, { status: 403 });

  const supabase = getSupabaseAdmin();
  const parsed = saleCreateSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ message: "Invalid sale details" }, { status: 400 });

  const body = parsed.data;
  const items = body.items;

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
      subtotal: body.subtotal,
      discount: body.discount,
      tax: body.tax,
      total: body.total,
      payment_method: body.paymentMethod,
      payment_reference: body.paymentReference,
      status: body.status
    })
    .select("*")
    .single();

  if (error) return safeErrorResponse();

  await supabase.from("audit_logs").insert({
    business_id: session.businessId,
    user_id: session.userId,
    action: "sale:completed",
    entity: "Sale",
    entity_id: sale.id
  });

  return NextResponse.json({ sale }, { status: 201 });
}
