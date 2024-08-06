import axios from "axios";
import setupInterceptors from "./setupInterceptors";

const BASE_URL = "http://localhost:3000/payment";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Define exception routes if there are any
const exceptionRoutes = [];
setupInterceptors(axiosInstance, exceptionRoutes);

const paymentService = {
  getPaymentsByStudentId: async (id) => {
    try {
      const response = await axiosInstance.get(`/getPaymentsByStudentId/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the payment"
      );
    }
  },
  exportReceiptAsPDF: async (paymentId) => {
    try {
      // Returns a download URL for the PDF
      return `${BASE_URL}/receiptPDF/${paymentId}`;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while exporting the receipt"
      );
    }
  },
  updateReceipt: async (paymentId, updates) => {
    try {
      const response = await axiosInstance.put(
        `/UpdateReceipt/${paymentId}`,
        updates
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while updating the receipt"
      );
    }
  },
  addPayment: async (paymentData) => {
    try {
      const response = await axiosInstance.post("/add", paymentData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while adding the payment"
      );
    }
  },
};

export default paymentService;
