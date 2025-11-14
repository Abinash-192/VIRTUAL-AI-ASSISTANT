import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection successful to database");
  } catch (error) {
    console.log("Database connection failed");
  }
};

export default connectDB;
