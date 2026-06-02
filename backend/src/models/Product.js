import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    barcode: { type: String, trim: true },
    costPrice: { type: Number, default: 0 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    icon: { type: String, default: "PR" },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);

