import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const InvoiceService = {
    updateInvoice: async (id, updates) => {
        try {
            const response = await axios.put(`${BASE_URL}/invoice/updateInvoice/${id}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while updating the invoice');
        }
    },
    getInvoiceByStudentId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/invoice/getInvoiceById/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the invoice');
        }
    },
};

export default InvoiceService;
