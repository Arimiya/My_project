import { model, models, Schema } from "mongoose";
import { tenantFields } from "./base";

const productSchema = new Schema(
  {
    ...tenantFields,
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String, required: true },
    imageUrl: String,
    sku: { type: String, index: true },
    barcode: String,
    buyingPrice: { type: Number, default: 0 },
    sellingPrice: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 5 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", productSchema);

