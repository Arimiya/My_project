import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String, trim: true },
    product: { type: String, trim: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Supplier", supplierSchema);

