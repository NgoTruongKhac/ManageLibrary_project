import mongoose from "mongoose";
import { DB_URI } from "../configs/env.js";

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connect success");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
