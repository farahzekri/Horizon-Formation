import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

const courseService = {
    addCourse: async (courseData) => {
        try {
            const response = await axios.post(`${BASE_URL}/course/addCourse`, courseData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while adding the course');
        }
    },
    getAllCourses: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/course/getAllCourses`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching courses');
        }
    },
    updateCourseById: async (id, updates) => {
        try {
            const response = await axios.patch(`${BASE_URL}/course/updateCourse/${id}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while updating the course');
        }
    },
    getCourseById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/course/getCourse/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while fetching the course');
        }
    },
    deleteCourseById: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/course/deleteCourse/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'An error occurred while deleting the course');
        }
    }
};

export default courseService;
