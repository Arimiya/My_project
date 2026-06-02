import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    vat: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "Cash" },
    receiptNumber: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Sale", saleSchema);

