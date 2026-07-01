import { model, models, Schema } from "mongoose";
import { tenantFields } from "./base";

const saleItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    name: String,
    quantity: Number,
    unitPrice: Number,
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: Number
  },
  { _id: false }
);

const saleSchema = new Schema(
  {
    ...tenantFields,
    invoiceNumber: { type: String, required: true },
    cashierId: { type: Schema.Types.ObjectId, ref: "User" },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    items: [saleItemSchema],
    subtotal: Number,
    discount: Number,
    tax: Number,
    total: Number,
    paymentMethod: { type: String, enum: ["Cash", "Mobile Money", "Card", "Bank Transfer", "Split Payment"], required: true },
    paymentReference: String,
    status: { type: String, enum: ["paid", "refunded", "void"], default: "paid" }
  },
  { timestamps: true }
);

export const Sale = models.Sale || model("Sale", saleSchema);
export const SaleItem = saleItemSchema;

