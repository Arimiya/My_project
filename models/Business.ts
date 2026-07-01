import { model, models, Schema } from "mongoose";

const businessSchema = new Schema(
  {
    name: { type: String, required: true },
    type: String,
    location: String,
    phone: String,
    email: String,
    logoUrl: String,
    currency: { type: String, default: "GHS" },
    taxRate: { type: Number, default: 0 },
    status: { type: String, enum: ["trial", "active", "expired", "suspended"], default: "trial" }
  },
  { timestamps: true }
);

export const Business = models.Business || model("Business", businessSchema);

