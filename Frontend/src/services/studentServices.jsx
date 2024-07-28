import axios from 'axios';

const API_URL = 'http://localhost:3000/student';
const token = localStorage.getItem('token');

const studentServices = {

    getAllStudents : async () => {
        try {
            const response = await axios.get(`${API_URL}/all`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            console.log('students', response.data)
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
                    'x-auth-token': token,
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
    },
    getStudentById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/getById/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the student');
        }
    },

    getFormationByStudentId: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/getFormationByStudentId/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the student');
        }
    },
    editStudent: async (id, studentData) => {
        console.log('studentId',id)

        try {
            const response = await axios.put(`${API_URL}/editStudent/${id}`, studentData);
            return response.data;
        } catch (error) {
            console.error('Error editing student:', error);
            throw error;
        }
    }
}

export default studentServices;