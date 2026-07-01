import { model, models, Schema } from "mongoose";
import { tenantFields } from "./base";

const inventoryTransactionSchema = new Schema(
  {
    ...tenantFields,
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: "Supplier" },
    type: { type: String, enum: ["stock_in", "stock_out", "adjustment", "damaged", "returned"], required: true },
    quantity: { type: Number, required: true },
    note: String,
    performedBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const InventoryTransaction = models.InventoryTransaction || model("InventoryTransaction", inventoryTransactionSchema);

