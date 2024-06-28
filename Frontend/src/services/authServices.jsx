import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Replace with your backend URL
const token = localStorage.getItem("token");
///Ajouter le token dans chaque requête du sub_admin sauf login et register
const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
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
  register: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "An error occurred during registration"
      );
    }
  },
  //Affiche Profil
  getUserProfile: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/Profil/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  //Update Profil
  updateUserProfile: async (username, userData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/user/updateProfil/${username}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default authService;
