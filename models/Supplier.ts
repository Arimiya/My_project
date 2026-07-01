import { model, models, Schema } from "mongoose";
import { tenantFields } from "./base";

const supplierSchema = new Schema(
  {
    ...tenantFields,
    name: { type: String, required: true },
    phone: String,
    email: String,
    address: String,
    productsSupplied: [String],
    amountOwed: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ["paid", "partial", "owed"], default: "paid" }
  },
  { timestamps: true }
);

export const Supplier = models.Supplier || model("Supplier", supplierSchema);

