import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const salleService = {
    addSalle: async (salleData) => {
        try {
          const response = await axiosInstance.post(
            "/salle/addSalle",
            salleData // Envoyer les données de la salle ici
          );
          return response.data;
        } catch (error) {
          throw new Error(
            error.response?.data?.message ||
            "An error occurred while adding the salle"
          );
        }
      },
  
    getAllsalles: async () => {
      try {
        const response = await axiosInstance.get("/salle/getAllSalle");
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            "An error occurred while fetching courses"
        );
      }
    },
    deleteSallesById: async (id) => {
        try {
          const response = await axiosInstance.delete(`/salle/deletesalles/${id}`);
          return response.data;
        } catch (error) {
          throw new Error(
            error.response?.data?.message ||
              "An error occurred while deleting the salle"
          );
        }
      },
  
    
  };
  
  export default salleService;