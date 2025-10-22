import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDB from "../config/db.js";

dotenv.config();

await connectDB();

const seedUsers = async () => {
  const users = [
    {
      name: "Admin BAU",
      email: "bau@umg.ac.id",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      name: "HIMATIF UMG",
      email: "himatif@umg.ac.id",
      password: await bcrypt.hash("himatif12012002", 10),
      role: "ormawa",
    },
  ];

  await User.insertMany(users);
  console.log("✅ Users seeded successfully!");
  process.exit();
};

seedUsers();