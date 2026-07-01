import { model, models, Schema } from "mongoose";

const branchSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    name: { type: String, required: true },
    location: String,
    phone: String,
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Branch = models.Branch || model("Branch", branchSchema);

