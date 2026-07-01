import { model, models, Schema } from "mongoose";

const permissionSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    description: String
  },
  { timestamps: true }
);

export const Permission = models.Permission || model("Permission", permissionSchema);

