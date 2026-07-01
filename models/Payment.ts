import { model, models, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
    subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription" },
    provider: { type: String, enum: ["paystack", "stripe", "manual"], default: "paystack" },
    reference: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "GHS" },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    metadata: Schema.Types.Mixed
  },
  { timestamps: true }
);

export const Payment = models.Payment || model("Payment", paymentSchema);

