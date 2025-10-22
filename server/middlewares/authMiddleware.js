import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware untuk cek login
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token tidak valid" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
  }
};

// Middleware untuk cek role admin
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Akses khusus admin saja" });
  }
};
