const BASE_URL = "http://localhost:3000";
///Ajouter le token dans chaque requête du sub_admin
export const get_All_Users = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/user/get_All_Users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/user/Update_Status/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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