import mongoose from "mongoose";
import { SERVER_URL } from "../configs/env.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    avatar: {
      type: String,
      default: `${SERVER_URL}/uploads/avatars/blank-avatar.png`,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
