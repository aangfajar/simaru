import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Tambah User (Khusus Admin)
export const addUser = async (req, res) => {
try {
     const { name, email, password, role } = req.body;

     // Validasi email harus menggunakan domain umg.ac.id
     if (!email.endsWith("@umg.ac.id")) {
        return res.status(400).json({ message: "Gunakan email resmi universitas (@umg.ac.id)" });
     }

     // cek apakah email sudah terdaftar/user sudah ada
     const existingUser = await User.findOne({ email });
     if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
     }

     // hash password
     const hashedPassword = await bcrypt.hash(password, 10);

     // buat user baru
     const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "ormawa",
     });

     res.status(201).json({
        massage: "User berhasil ditambahkan!",
        user:{
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
     });

    //  await newUser.save();
    //  res.status(201).json({ message: "User berhasil ditambahkan!", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });

      //  console.error(error);
      //  res.status(500).json({ message: "Terjadi kesalahan server" });
    }

};

// Lihat Semua User
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // jangan tampilkan password
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data user", error: error.message });
  }
}