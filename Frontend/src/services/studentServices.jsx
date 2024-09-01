import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000/student";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Define exception routes if there are any
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const studentServices = {
  getAllStudents: async () => {
    try {
      const response = await axiosInstance.get("/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching students"
      );
    }
  },
  addStudent: async (studentData) => {
    try {
      const response = await axiosInstance.post("/add", studentData);
      return response.data;
    } catch (error) {
      console.error("Error adding student:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while adding the student"
      );
    }
  },
  deleteStudentById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/deleteStudent/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while deleting the student"
      );
    }
  },
  getStudentById: async (id) => {
    try {
      const response = await axiosInstance.get(`/getById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the student"
      );
    }
  },
  getFormationByStudentId: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/getFormationByStudentId/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the formation"
      );
    }
  },
  editStudent: async (id, studentData) => {
    try {
      const response = await axiosInstance.put(
        `/editStudent/${id}`,
        studentData
      );
      return response.data;
    } catch (error) {
      console.error("Error editing student:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while editing the student"
      );
    }
  },
};

export default studentServices;
