import axios from 'axios';

const API_URL = 'http://localhost:3000/teacher';
const token = localStorage.getItem('token');

const teacherServices = {
    getAllTeachers: async () => {
        try {
            const response = await axios.get(`${API_URL}/getAll`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            console.log('teachers', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching teachers:', error);
            throw error;
        }
    },
    addTeacher: async (teacherData) => {
        try {
            const response = await axios.post(`${API_URL}/add`, teacherData, {
                headers: {
                    'x-auth-token': token,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding teacher:', error);
            throw error;
        }
    },
    deleteTeacherById: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while deleting the teacher');
        }
    },
    getTeacherById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/getById/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the teacher');
        }
    },
    editTeacher: async (id, teacherData) => {
        try {
            const response = await axios.put(`${API_URL}/update/${id}`, teacherData, {
                headers: {
                    'x-auth-token': token,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error editing teacher:', error);
            throw error;
        }
    }
}

export default teacherServices;
