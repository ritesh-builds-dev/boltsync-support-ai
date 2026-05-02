// Defines the structure and rules for saving dashboard settings in the database.
import mongoose, { Schema, model, models } from "mongoose";
interface ISettings {
    OwnerId: string;
    businessName: string;
    supportEmail: string;
    contactNumber: string;
    address: string;
    knowledge: string;
}

const settingsSchema = new Schema<ISettings>({
  OwnerId: {
    type: String,
    required: true,
    unique: true,
  },
  businessName: {
    type: String,
  },
  supportEmail: {
    type: String,
  },

  contactNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  knowledge: {
    type: String,
  },

}, { timestamps: true })

const settings = models.Settings || model("Settings", settingsSchema);

export default settings