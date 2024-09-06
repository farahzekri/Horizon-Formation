import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const API_URL = "http://localhost:3000/schedule";
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Define exception routes if there are any
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const scheduleService = {
  addSchedule : async (id, updatedDays) => {
    try {
        const response = await axiosInstance.post(`http://localhost:3000/schedule/create`, {
            classId: id,
            days: updatedDays,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding schedule:", error);
        throw new Error('An error occurred while adding the schedule');
    }
},
  getScheduleByClassId: async (classId) => {
    try {
      const response = await axiosInstance.get(`/getschedulebyclassid/${classId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching schedule:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the schedule"
      );
    }
  },
  getAvailableRooms: async (day, start, end) => {
    try {
        const response = await axiosInstance.get(`/getAvailableRooms`, {
            params: {
                day,
                start,
                end
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching available rooms:", error);
        throw new Error(
            error.response?.data?.message ||
            "An error occurred while fetching available rooms"
        );
    }
}
};

export default scheduleService;
