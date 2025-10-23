import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import logo from "../../assets/images/logo.png"; // logo.png kamu

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="Simaru Logo" className="w-85 mb-2" />
      </div>

      {/* Card */}
      <div className="bg-[#242424] p-10 rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.6)] w-[420px] text-center">
        <h2 className="text-4xl font-semibold mb-8 text-gray-300">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition duration-200 shadow-md"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

       <a
            href="/forgotPassword"
            className="block mt-4 text-sm text-blue-400 hover:text-blue-300 transition duration-200"
>
  Lupa Password?
</a>

      </div>
    </div>
  );
};

export default Login;
