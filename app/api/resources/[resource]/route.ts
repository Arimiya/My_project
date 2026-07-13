import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, resourceTableMap, toSnakeRecord, type ResourceName } from "@/lib/supabase";
import { assertSameOrigin, requireApiSession, safeErrorResponse } from "@/lib/api-security";
import { resourceCreateSchema } from "@/lib/validation";

function getTable(resource: string) {
  return resourceTableMap[resource as ResourceName];
}

const resourcePermissions: Partial<Record<ResourceName, { read: string; create: string }>> = {
  products: { read: "products:read", create: "products:create" },
  categories: { read: "products:read", create: "products:create" },
  customers: { read: "customers:read", create: "customers:create" },
  suppliers: { read: "suppliers:read", create: "suppliers:create" },
  expenses: { read: "expenses:read", create: "expenses:create" },
  inventory: { read: "inventory:read", create: "inventory:create" },
  notifications: { read: "notifications:read", create: "notifications:create" },
  "audit-logs": { read: "audit_logs:read", create: "audit_logs:create" }
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const table = getTable(resource);
  if (!table) return NextResponse.json({ message: "Unknown resource" }, { status: 404 });

  const permission = resourcePermissions[resource as ResourceName]?.read;
  const { session, response } = await requireApiSession(permission);
  if (response) return response;
  if (!session?.businessId) return NextResponse.json({ message: "Business context is required" }, { status: 403 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("business_id", session.businessId)
    .order("created_at", { ascending: false });

  if (error) return safeErrorResponse();
  return NextResponse.json({ records: data ?? [] });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const csrfError = assertSameOrigin(req);
  if (csrfError) return csrfError;

  const { resource } = await params;
  const table = getTable(resource);
  if (!table) return NextResponse.json({ message: "Unknown resource" }, { status: 404 });

  const permission = resourcePermissions[resource as ResourceName]?.create;
  const { session, response } = await requireApiSession(permission);
  if (response) return response;
  if (!session?.businessId) return NextResponse.json({ message: "Business context is required" }, { status: 403 });

  const parsed = resourceCreateSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ message: "Invalid request body" }, { status: 400 });

  const body = parsed.data;
  const supabase = getSupabaseAdmin();
  const payload = toSnakeRecord({
    ...body,
    businessId: session.businessId,
    branchId: body.branchId || session.branchId
  });

  const { data: record, error } = await supabase.from(table).insert(payload).select("*").single();
  if (error) return safeErrorResponse();

  await supabase.from("audit_logs").insert({
    business_id: session.businessId,
    user_id: session.userId,
    action: `${resource}:created`,
    entity: resource,
    entity_id: String(record.id)
  });

  return NextResponse.json({ record }, { status: 201 });
}
