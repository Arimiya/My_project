import { model, models, Schema } from "mongoose";
import { tenantFields } from "./base";

const customerSchema = new Schema(
  {
    ...tenantFields,
    name: { type: String, required: true },
    phone: String,
    email: String,
    address: String,
    loyaltyPoints: { type: Number, default: 0 },
    balance: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Customer = models.Customer || model("Customer", customerSchema);

