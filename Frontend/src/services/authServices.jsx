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
    },
    //Affiche Profil
    getUserProfile: async (username) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/Profil/${username}`);
            return response.data;
        } catch (error) {
            // Vous pouvez gérer les erreurs ici ou les propager vers le frontend
            throw error.response.data;
        }
    },
    //Update Profil
    updateUserProfile: async (username, userData) => {
        try {
            const response = await axios.put(`${BASE_URL}/user/updateProfil/${username}`, userData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
    

};

export default authService;
