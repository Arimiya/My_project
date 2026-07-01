import { model, models, Schema } from "mongoose";
import { tenantFields } from "./base";

const expenseSchema = new Schema(
  {
    ...tenantFields,
    category: { type: String, required: true },
    description: String,
    amount: { type: Number, required: true },
    recordedBy: { type: Schema.Types.ObjectId, ref: "User" },
    expenseDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Expense = models.Expense || model("Expense", expenseSchema);

