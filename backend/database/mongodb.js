import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not defined in environment variables");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI).then(() => {
      console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
