import { Schema } from "mongoose";

export const tenantFields = {
  businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
  branchId: { type: Schema.Types.ObjectId, ref: "Branch", index: true }
};

