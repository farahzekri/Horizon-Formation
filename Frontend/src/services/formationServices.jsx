import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Define exception routes if there are any
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const formationService = {
  addFormation: async (formationData) => {
    try {
      const response = await axiosInstance.post(
        "/formation/addFormation",
        formationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while adding the formation"
      );
    }
  },
  getAllFormations: async () => {
    try {
      const response = await axiosInstance.get("/formation/getAllFormations");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching formations"
      );
    }
  },
  updateFormationById: async (id, updates) => {
    try {
      const response = await axiosInstance.put(
        `/formation/updateFormation/${id}`,
        updates
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while updating the formation"
      );
    }
  },
  getFormationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/formation/getFormation/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the formation"
      );
    }
  },
  deleteFormationById: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/formation/deleteFormation/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while deleting the formation"
      );
    }
  },
  getcourses: async (id) => {
    try {
      const response = await axiosInstance.get(`/formation/getcourses/${id}/courses`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the formation"
      );
    }
  },
};

export default formationService;
