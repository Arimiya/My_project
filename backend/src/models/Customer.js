import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    tier: { type: String, default: "Starter" },
    spend: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);

