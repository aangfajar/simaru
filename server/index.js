import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
// Connect ke MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware (nanti tambah body-parser, routes, dll)
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running and database connected!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
