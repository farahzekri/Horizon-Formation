import axios from "axios";
const API_URL = "http://localhost:3000/classes";
const token = localStorage.getItem("token");
const classServices = {
  addclass: async (classData) => {
    try {
      const response = await axios.post(`${API_URL}/creation`, classData, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  },

  getclass: async () => {
    try {
      const response = await axios.get(`${API_URL}/AllClasses`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  },

  deleteClass: async (classId) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${classId}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting class:", error);
      throw error;
    }
  },
  updateClass: async (classId, updatedData) => {
    try {
      const response = await axios.put(
        `${API_URL}/Updateclasses/${classId}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  },
};

export default classServices;
