import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, { username, password });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default authService;
