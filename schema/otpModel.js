import mongoose, { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  otp: {
    type: String,
    unique: true,
    required: true,
  },
});

const OtpModel = model("otp", OtpSchema);

export default OtpModel;
