import { model, models, Schema } from "mongoose";

const auditLogSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    entity: String,
    entityId: String,
    metadata: Schema.Types.Mixed,
    ipAddress: String
  },
  { timestamps: true }
);

export const AuditLog = models.AuditLog || model("AuditLog", auditLogSchema);

