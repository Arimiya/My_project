import { model, models, Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    message: String,
    type: { type: String, enum: ["low_stock", "subscription", "sale", "payment", "staff"], default: "sale" },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Notification = models.Notification || model("Notification", notificationSchema);

