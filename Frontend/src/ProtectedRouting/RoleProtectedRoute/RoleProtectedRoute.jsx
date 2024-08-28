import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth" // Assuming you have a utility to get the user's role

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRole();

  if (!userRole) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;