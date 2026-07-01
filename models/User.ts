import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: String,
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["super_admin", "owner", "manager", "cashier", "inventory_officer", "accountant"], default: "owner" },
    active: { type: Boolean, default: true },
    lastLoginAt: Date
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);

