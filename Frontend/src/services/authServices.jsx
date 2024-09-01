import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000"; // Replace with your backend URL
const token = localStorage.getItem("token");

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Define the exception routes
const exceptionRoutes = ["/user/login"];

// Set up interceptors
setupInterceptors(axiosInstance, exceptionRoutes);

const authService = {
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      throw error.response.data;
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("/user/logout");
      localStorage.removeItem("token");
      window.location.href = "/auth/sign-in";
    } catch (error) {
      throw error.response.data;
    }
  },
  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/user/register", userData);
      return response.data.message;
    } catch (error) {
      throw new Error(
        error.response.data.message || "An error occurred during registration"
      );
    }
  },
  // Affiche Profil
  getUserProfile: async (username) => {
    try {
      const response = await axiosInstance.get(`/user/Profil/${username}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  // Update Profil
  updateUserProfile: async (username, userData) => {
    try {
      const response = await axiosInstance.put(
        `/user/updateProfil/${username}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  verifyToken: async () => {
    try {
      const response = await axiosInstance.post("/user/verify-token", {
        token,
      });
      return response.data.valid;
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  },
  refreshToken: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/refresh-token`,
        { withCredentials: true }
      );
      const { token } = response.data;
      return token;
    } catch (error) {
      throw new Error("Unable to refresh token");
    }
  },
};

export default authService;
