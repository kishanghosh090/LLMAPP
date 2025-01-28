import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// check if MONGODB_URI or DB_NAME is not found
if (!process.env.MONGODB_URI || !DB_NAME) {
  console.log("====================================");
  console.log("MONGODB_URI or DB_NAME not found");
  console.log("====================================");
  process.exit(1);
}

// connect to database
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB Connected!! connection host: ${connectionInstance.connection.host}`
    );
    return connectionInstance;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
