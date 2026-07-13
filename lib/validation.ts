import { z } from "zod";
import { subscriptionPlans } from "./plans";

const planKeys = subscriptionPlans.map((plan) => plan.key) as [string, ...string[]];

export const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1)
});

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7).max(30),
  businessName: z.string().trim().min(2).max(160),
  businessType: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(160),
  password: z.string().min(8).max(128),
  plan: z.enum(planKeys).default("trial")
});

export const verificationCodeSchema = z.object({
  code: z.string().trim().regex(/^\d{6}$/)
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase())
});

export const resetPasswordSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8).max(128)
});

export const paystackInitializeSchema = z.object({
  planKey: z.enum(planKeys)
});

export const resourceCreateSchema = z.record(z.unknown()).refine((value) => !("businessId" in value) && !("business_id" in value), {
  message: "Tenant fields cannot be supplied by the browser"
});

export const saleItemSchema = z.object({
  productId: z.string().uuid().optional(),
  name: z.string().trim().max(160).optional(),
  quantity: z.coerce.number().positive(),
  unitPrice: z.coerce.number().nonnegative().optional(),
  discount: z.coerce.number().nonnegative().default(0)
});

export const saleCreateSchema = z.object({
  customerId: z.string().uuid().optional().nullable(),
  items: z.array(saleItemSchema).min(1),
  subtotal: z.coerce.number().nonnegative(),
  discount: z.coerce.number().nonnegative().default(0),
  tax: z.coerce.number().nonnegative().default(0),
  total: z.coerce.number().nonnegative(),
  paymentMethod: z.enum(["cash", "mobile_money", "card", "bank_transfer", "split", "Cash", "Mobile Money", "Card", "Bank Transfer", "Split Payment"]),
  paymentReference: z.string().trim().max(120).optional(),
  status: z.enum(["completed", "held", "pending"]).default("completed")
});

export async function formDataToObject(req: Request) {
  const form = await req.formData();
  return Object.fromEntries(form.entries());
}
