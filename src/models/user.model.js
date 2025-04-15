import mongoose from "mongoose";
import { collections } from "../common/constants/db.js";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      trim: true,
      lower: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lower: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      min: 5,
      max: 50,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

  
    this.password = this.password;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return password === this.password;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

export const User = mongoose.model(collections.user, userSchema);
