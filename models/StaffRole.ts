import { model, models, Schema } from "mongoose";

const staffRoleSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    name: { type: String, required: true },
    permissions: [String]
  },
  { timestamps: true }
);

export const StaffRole = models.StaffRole || model("StaffRole", staffRoleSchema);

