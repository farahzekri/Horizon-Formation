import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const API_URL = "http://localhost:3000/classes";
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Define exception routes if there are any
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const classServices = {
  addClass: async (classData) => {
    try {
      const response = await axiosInstance.post("/creation", classData);

      return response.data;
    } catch (error) {
      console.error("Error adding class:", error);
      throw error;
    }
  },

  getclass: async () => {
    try {
      const response = await axiosInstance.get("/AllClasses");
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

  deleteClass: async (classId) => {
    try {
      const response = await axiosInstance.delete(`/delete/${classId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting class:", error);
      throw error;
    }
  },

  updateClass: async (classId, updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/Updateclasses/${classId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  },
  getclassById: async (id) => {
    try {
      const response = await axiosInstance.get(`/classe/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching class by ID:", error);
      throw error;
    }
  },
  updateClassDetails: async (classId, updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/updateclassdetails/${classId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating class details:", error);
      throw error;
    }
  },

  updateClassStudents: async (classId, students) => {
    try {
      const response = await axiosInstance.put(
        `/updateClassStudents/${classId}`,
        { students }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating class students:", error);
      throw error;
    }
  },
};


export default classServices;
