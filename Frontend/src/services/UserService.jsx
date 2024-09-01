import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

export const get_All_Users = async () => {
  try {
    const response = await axiosInstance.get("/user/get_All_Users");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const Update_Status = async (userId, newStatus) => {
  try {
    const response = await axiosInstance.put(`/user/Update_Status/${userId}`, {
      status: newStatus,
    });

    // Assuming your API returns updated user data after successful update
    const updatedUserData = await response.json();
    return updatedUserData;
  } catch (error) {
    throw new Error("Error updating user status: " + error.message);
  }
};

export const get_User_By_Username = async (username) => {
  try {
    const response = await axiosInstance.get(`/user/Profil/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user", error.message);
  }
};

export const Update_User_By_Username = async (username, userData) => {
  try {
    const response = await axiosInstance.put(
      `/user/updateProfil/${username}`,
      userData
    );

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error updating user status:", error.message);
    throw error;
  }
};

export const Update_User_By_Username_sarra = async (username, userData) => {
  try {
    const response = await axiosInstance.put(
      `/user/updateProfil/${username}`,
      userData
    );

    return await response.json();
  } catch (error) {
    throw new Error("Error updating user profile: " + error.message);
  }
};
export const Update_Password_By_Username = async (username, newPassword) => {
  try {
    const response = await axiosInstance.put(
      `/user/updatePassword/${username}`,
      { password: newPassword }
    );
    if (response.status === 200) {
      return await response.data.message;
    }
  } catch (error) {
    throw new Error("Error updating user password: " + error.message);
  }
};
export const Check_Role = async () => {
  try {
    const response = await axiosInstance.get("/user/checkRole");
    return response.data.message; 
  } catch (error) {
    throw new Error("Error checking user role: " + error.message);
  }
};

