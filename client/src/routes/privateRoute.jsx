import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // kalau belum login → arahkan ke halaman login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // kalau sudah login → tampilkan halaman yang diminta
  return children;
};

export default PrivateRoute;
