import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);

    return decodedToken.role; 
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
