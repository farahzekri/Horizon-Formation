import axios from 'axios';

const API_URL = 'http://localhost:3000/student';
const token = localStorage.getItem('token');

const studentServices = {

    getAllStudents : async () => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    Authorization: token,
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
            console.log(token)
            const response = await axios.post(`${API_URL}/add`, studentData, {
                headers: {
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
        }
    },
    deleteStudentById: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/deleteStudent/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while deleting the student');
        }
    }
}

export default studentServices;