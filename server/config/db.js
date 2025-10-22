import mongoose from "mongoose";

const connectDB = async () => {
  // try {
  //   await mongoose.connect(process.env.MONGODB_URI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log("✅ MongoDB connected successfully");
  // } catch (error) {
  //   console.error("❌ MongoDB connection failed:", error.message);
  //   process.exit(1);
  // }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected successfully");
};

export default connectDB;
