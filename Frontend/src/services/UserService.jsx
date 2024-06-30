const BASE_URL = "http://localhost:3000";
export const get_All_Users = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user/get_All_Users`, {
       method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const Update_Status = async (userId, newStatus) => {
  try {
    const response = await fetch(`${BASE_URL}/user/Update_Status/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user status");
    }

    const data = await response.json();
    return data.user; // Retourne les données utilisateur mises à jour
  } catch (error) {
    console.error("Error updating user status:", error.message);
    throw error;
  }
};