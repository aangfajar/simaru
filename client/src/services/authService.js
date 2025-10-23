import api from "./api";

/**
 * Fungsi untuk login user
 * @param {Object} credentials - berisi { username, password }
 * @returns {Promise<Object>} data user dan token dari backend
 */
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Fungsi untuk mengirim email lupa password
export const ForgotPassword = async (emailData) => {
  try {
    const response = await api.post("/auth/forgot-password", emailData);
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};
