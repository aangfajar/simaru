import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    ormawa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    namaKegiatan: {
      type: String,
      required: true,
    },
    tanggalMulai: {
      type: Date,
      required: true,
    },
    tanggalSelesai: {
      type: Date,
      required: true,
    },
    lokasi: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
