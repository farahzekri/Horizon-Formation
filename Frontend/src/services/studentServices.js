import axios from 'axios';

const API_URL = 'http://localhost:3000/student';

const studentServices = {

    getAllStudents : async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    },
    addStudent: async (studentData) => {
        try {
            const response = await axios.post(`${API_URL}/add`, studentData);
            return response.data;
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
        }
    }
}

export default studentServices;