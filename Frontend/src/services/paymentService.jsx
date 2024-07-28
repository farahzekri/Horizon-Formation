import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const paymentService = {
    getPaymentsByStudentId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/payment/getPaymentsByStudentId/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the payment');
        }
    },
    exportReceiptAsPDF: async (paymentId) => {
        try {
            // Retourne une URL de téléchargement pour le PDF
            return `${BASE_URL}/payment/receiptPDF/${paymentId}`;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the payment');
        }
    },
    updateReceipt: async (paymentId, updates) => {
        try {
            const response = await axios.put(`${BASE_URL}/payment/UpdateReceipt/${paymentId}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while updating the receipt');
        }
    },

    addPayement: async (paymentData) => {
        try {
            const response = await axios.post(`${BASE_URL}/payment/add`, paymentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while adding the payment');
        }
    },
};

export default paymentService;
