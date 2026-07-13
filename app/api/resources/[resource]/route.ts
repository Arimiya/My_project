import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSupabaseAdmin, resourceTableMap, toSnakeRecord, type ResourceName } from "@/lib/supabase";

function getTable(resource: string) {
  return resourceTableMap[resource as ResourceName];
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const table = getTable(resource);
  if (!table) return NextResponse.json({ message: "Unknown resource" }, { status: 404 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("business_id", session.businessId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ records: data ?? [] });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const session = await getSession();
  if (!session?.businessId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const table = getTable(resource);
  if (!table) return NextResponse.json({ message: "Unknown resource" }, { status: 404 });

  const body = await req.json();
  const supabase = getSupabaseAdmin();
  const payload = toSnakeRecord({
    ...body,
    businessId: session.businessId,
    branchId: body.branchId || session.branchId
  });

  const { data: record, error } = await supabase.from(table).insert(payload).select("*").single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  await supabase.from("audit_logs").insert({
    business_id: session.businessId,
    user_id: session.userId,
    action: `${resource}:created`,
    entity: resource,
    entity_id: String(record.id)
  });

  return NextResponse.json({ record }, { status: 201 });
}
