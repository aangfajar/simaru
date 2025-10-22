import express from "express";
import { addUser, getAllUsers } from "../controllers/userController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Tambah User Baru (Khusus Admin)
router.post("/add", protect, adminOnly, addUser);

// Lihat Semua User (Khusus Admin)
router.get("/", protect, adminOnly, getAllUsers);

export default router;
