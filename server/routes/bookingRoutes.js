import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ormawa (harus login)
router.post("/", protect, createBooking);

// Admin (harus login & role admin)
router.get("/", protect, adminOnly, getAllBookings);
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
