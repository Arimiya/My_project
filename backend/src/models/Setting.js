import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    country: { type: String, default: "NG" },
    currency: { type: String, default: "NGN" },
  },
  { timestamps: true },
);

export default mongoose.model("Setting", settingSchema);

