import axios from 'axios';
const API_URL = 'http://localhost:3000/classes';


const classServices = {
    addclass: async (classData) => {
        try {
            const response = await axios.post(`${API_URL}/creation`, classData);
            return response.data;
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
        }
    },

    getclass: async () => {
        try {
            const response = await axios.get(`${API_URL}/AllClasses`);
            return response.data;
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
        }
    },
    
    getclassById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/classe/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
        }
    },

    deleteClass: async (classId) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${classId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting class:', error);
            throw error;
        }
    },
    updateClassDetails: async (classId, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/updateclassdetails/${classId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating class details:', error);
            throw error;
        }
    },

    updateClassStudents: async (classId, students) => {
        try {
            const response = await axios.put(`${API_URL}/updateClassStudents/${classId}`, { students });
            return response.data;
        } catch (error) {
            console.error('Error updating class students:', error);
            throw error;
        }
    }



}


export default classServices;