import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000/teacher";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Define exception routes if there are any
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const teacherServices = {
  getAllTeachers: async () => {
    try {
      const response = await axiosInstance.get("/getAll");
     
      return response.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching teachers"
      );
    }
  },
  addTeacher: async (teacherData) => {
    try {
      const response = await axiosInstance.post("/add", teacherData);
      return response.data;
    } catch (error) {
      console.error("Error adding teacher:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while adding the teacher"
      );
    }
  },
  deleteTeacherById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while deleting the teacher"
      );
    }
  },
  getTeacherById: async (id) => {
    try {
      const response = await axiosInstance.get(`/getById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the teacher"
      );
    }
  },
  editTeacher: async (id, teacherData) => {
    try {
      const response = await axiosInstance.put(`/update/${id}`, teacherData);
      return response.data;
    } catch (error) {
      console.error("Error editing teacher:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while editing the teacher"
      );
    }
  },
};

export default teacherServices;
