import { model, models, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    name: { type: String, required: true },
    description: String
  },
  { timestamps: true }
);

export const Category = models.Category || model("Category", categorySchema);

