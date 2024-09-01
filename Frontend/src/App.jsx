import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import CreateSubAdmin from "BackOffice/SubAdmin/create_SubAdmin/createSubAsmin";
import ProtectedRoute from "ProtectedRouting/RoleProtectedRoute/RoleProtectedRoute";
import PublicRoute from "ProtectedRouting/PublicRoute/PublicRoute";
const App = () => {
  return (
    <Routes>
      <Route
        path="auth/*"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route
        path="admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="sub-admin/*"
        element={
          <ProtectedRoute allowedRoles={["sub-admin"]}>
            <CreateSubAdmin />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/admin/Profil" replace />} />

      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

export default App;