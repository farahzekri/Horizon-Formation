import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth"; // Assuming you have a utility to get the user's role

const PublicRoute = ({ children }) => {
  const userRole = getUserRole();

  if (userRole) {
    return <Navigate to="/admin/Profil" replace />;
  }

  return children;
};

export default PublicRoute;
