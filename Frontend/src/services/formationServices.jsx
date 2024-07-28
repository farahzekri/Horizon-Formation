import axios from "axios";

const BASE_URL = "http://localhost:3000";
const token = localStorage.getItem("token");
const formationService = {
  addFormation: async (formationData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/formation/addFormation`,
        formationData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while adding the formation"
      );
    }
  },
  getAllFormations: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/formation/getAllFormations`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while fetching formations"
      );
    }
  },
  updateFormationById: async (id, updates) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/formation/updateFormation/${id}`,
        updates,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while updating the formation"
      );
    }
  },
  getFormationById: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/formation/getFormation/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while fetching the formation"
      );
    }
  },
  deleteFormationById: async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/formation/deleteFormation/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while deleting the formation"
      );
    }
  },
};

export default formationService;
