import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
