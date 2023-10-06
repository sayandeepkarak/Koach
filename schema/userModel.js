import { Schema, model } from "mongoose";
import { hash, hashSync } from "bcrypt";
import CustomError from "../service/CustomError";

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    emailValue: {
      type: String,
      match: /^([a-zA-Z0-9.-]+)@gmail.com$/,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  mobile: {
    type: Number,
    match: /^[6-9]([0-9]){9}$/,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  userType: {
    type: String,
    enum: ["admin", "teacher", "student"],
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  refreshtoken: {
    type: String,
    default: null,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  }
});

const UserModel = model("User", UserSchema);

export default UserModel;
