import { model, models, Schema } from "mongoose";

const receiptSettingSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, unique: true },
    businessName: String,
    logoUrl: String,
    address: String,
    phone: String,
    footerMessage: { type: String, default: "Thank you for your purchase." },
    showTax: { type: Boolean, default: true },
    showCashier: { type: Boolean, default: true },
    invoicePrefix: { type: String, default: "INV" }
  },
  { timestamps: true }
);

export const ReceiptSetting = models.ReceiptSetting || model("ReceiptSetting", receiptSettingSchema);

