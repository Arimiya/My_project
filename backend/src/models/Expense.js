import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Expense", expenseSchema);

