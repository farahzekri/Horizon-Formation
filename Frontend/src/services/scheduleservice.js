import axios from 'axios';
const API_URL = 'http://localhost:3000/schedule';


const scheduleService={
    addSchedule: async (classId, days) => {
        try {
            const response = await axios.post(`${API_URL}/create`, { classId, days });
            return response.data;
        } catch (error) {
            console.error('Error adding schedule:', error);
            throw error;
        }
    },
    getScheduleByClassId: async (classId) => {
        try {
            const response = await axios.get(`${API_URL}/${classId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching schedule:', error);
            throw error;
        }
    }
}

export default scheduleService;