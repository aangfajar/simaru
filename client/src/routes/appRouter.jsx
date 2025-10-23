import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgotPassword";
import DashboardUser from "../pages/user/DashboardUser";
import PrivateRoute from "./privateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* Halaman Dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
