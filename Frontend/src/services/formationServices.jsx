import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const formationService = {
    addFormation: async (formationData) => {
        try {
            const response = await axios.post(`${BASE_URL}/formation/addFormation`, formationData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while adding the formation');
        }
    },
    getAllFormations: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/formation/getAllFormations`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching formations');
        }
    },
    updateFormationById: async (id, updates) => {
        try {
            const response = await axios.put(`${BASE_URL}/formation/updateFormation/${id}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while updating the formation');
        }
    },
    getFormationById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/formation/getFormation/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the formation');
        }
    },
    deleteFormationById: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/formation/deleteFormation/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while deleting the formation');
        }
    }
};

export default formationService;
