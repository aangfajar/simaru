import Booking from "../models/bookingModel.js";

// Create booking (ormawa)
export const createBooking = async (req, res) => {
  try {
    const { ormawa, namaKegiatan, tanggalMulai, tanggalSelesai, lokasi, keterangan } = req.body;

    const newBooking = await Booking.create({
      ormawa,
      namaKegiatan,
      tanggalMulai,
      tanggalSelesai,
      lokasi,
      keterangan,
    });

    res.status(201).json({ message: "Peminjaman berhasil diajukan", data: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat peminjaman", error: error.message });
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("ormawa", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data peminjaman", error: error.message });
  }
};

// Update status (admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("ormawa", "name email");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Peminjaman tidak ditemukan" });
    }

    res.status(200).json({ message: "Status berhasil diperbarui", data: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui status", error: error.message });
  }
};
