import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000/invoice";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Define exception routes if there are any
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const InvoiceService = {
  updateInvoice: async (id, updates) => {
    try {
      const response = await axiosInstance.put(`/updateInvoice/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while updating the invoice"
      );
    }
  },
  getInvoiceByStudentId: async (id) => {
    try {
      const response = await axiosInstance.get(`/getInvoiceById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the invoice"
      );
    }
  },
};

export default InvoiceService;
