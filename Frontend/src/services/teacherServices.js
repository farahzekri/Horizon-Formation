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
  createSalariesForYear: async (teacherId, workHours, hourlyRate, method, year) => {
    try {
      const response = await axiosInstance.post(`/salaries/create`, {
        teacherId,
        workHours,
        hourlyRate,
        method,
        year
      });
      return response.data;
    } catch (error) {
      console.error("Error creating salaries:", error);
      throw new Error(
          error.response?.data?.message ||
          "An error occurred while creating salaries"
      );
    }
  },
  addTeacherSalary: async (teacherId, workHours, hourlyRate, method, month) => {
    try {
      const response = await axiosInstance.post(`/salaries/add`, {
        teacherId,
        workHours,
        hourlyRate,
        method,
        month
      });
      return response.data;
    } catch (error) {
      console.error("Error creating salary:", error);
      throw new Error(
          error.response?.data?.message ||
          "An error occurred while creating salary"
      );
    }
  },
  updateSalaries: async (teacherId, editedSalaries) => {
    try {
      const response = await axiosInstance.put(`/salaries/update`, {
        teacherId,
        editedSalaries
      });
      return response.data;
    } catch (error) {
      console.error("Error updating salaries:", error);
      throw new Error(
          error.response?.data?.message ||
          "An error occurred while updating salaries"
      );
    }
  },
  deleteSalary: async (teacherId, salaryId) => {
    try {
      const response = await axiosInstance.delete(`/salaries/delete/${teacherId}/${salaryId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting salary:", error);
      throw new Error(
          error.response?.data?.message ||
          "An error occurred while deleting the salary"
      );
    }
  },
  getSalariesByYear: async (teacherId) => {
    try {
      const response = await axiosInstance.get(`/salariesByYear/${teacherId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching salaries by year:", error);
      throw new Error(
          error.response?.data?.message ||
          "An error occurred while fetching salaries by year"
      );
    }
  }


};

export default teacherServices;
