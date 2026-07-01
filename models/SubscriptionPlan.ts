import { model, models, Schema } from "mongoose";

const subscriptionPlanSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    durationDays: { type: Number, default: 30 },
    features: [String],
    limits: {
      branches: Number,
      users: Number,
      products: Number
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const SubscriptionPlan = models.SubscriptionPlan || model("SubscriptionPlan", subscriptionPlanSchema);

