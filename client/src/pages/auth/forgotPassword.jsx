import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import api from "../../services/api"; // axios instance

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/reset-password", {
        email: formData.email,
        password: formData.newPassword,
      });
      setMessage(data.message || "Password berhasil diubah!");
      setTimeout(() => navigate("/"), 2000); // balik ke login setelah 2 detik
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengubah password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-white">
      {/* kiri - logo */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={logo} alt="Simaru Logo" className="w-[400px] mb-4" />
      </div>

      {/* kanan - form reset password */}
      <div className="flex-1 flex justify-center">
        <div className="bg-[#242424] p-10 rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.6)] w-[420px]">
          <h2 className="text-4xl font-semibold mb-8 text-gray-300 text-center">
            Ubah Password
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="Password Baru"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Password Baru"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            {message && <p className="text-green-400 text-sm">{message}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition duration-200 shadow-md"
            >
              {loading ? "Menyimpan..." : "Simpan Password Baru"}
            </button>
          </form>

          <a
            href="/"
            className="block mt-5 text-sm text-blue-400 hover:underline text-center"
          >
            Kembali ke Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
