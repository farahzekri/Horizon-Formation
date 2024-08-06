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

const courseService = {
  addCourse: async (courseData) => {
    try {
      const response = await axiosInstance.post(
        "/course/addCourse",
        courseData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while adding the course"
      );
    }
  },

  getAllCourses: async () => {
    try {
      const response = await axiosInstance.get("/course/getAllCourses");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching courses"
      );
    }
  },

  updateCourseById: async (id, updates) => {
    try {
      const response = await axiosInstance.patch(
        `/course/updateCourse/${id}`,
        updates
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while updating the course"
      );
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await axiosInstance.get(`/course/getCourse/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the course"
      );
    }
  },

  deleteCourseById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/course/deleteCourse/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while deleting the course"
      );
    }
  },
};

export default courseService;
