import axios from "axios";

// axios instance utama untuk koneksi ke backend Express
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // kalau backend pakai cookie/session
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
