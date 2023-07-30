import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "please add the email address"],
    },
    phone: {
      type: String,
      required: [true, "please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("contact", contactSchema);
