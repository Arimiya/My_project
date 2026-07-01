import { model, models, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    planId: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan" },
    planKey: { type: String, required: true },
    status: { type: String, enum: ["trial", "active", "expired", "cancelled"], default: "trial" },
    startDate: Date,
    expiryDate: Date,
    autoRenew: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Subscription = models.Subscription || model("Subscription", subscriptionSchema);

