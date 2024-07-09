import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userType } from "../shared/types";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    default: "user",
  },
  veifyEmailToken: {
    type: String,
    required: true,
    default: "",
  },
  verified: {
    type: Boolean,
    required: true,

    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model<userType>("User", userSchema);

export default User;
