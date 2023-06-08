import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AdminPrivateComponent = () => {
  const auth = localStorage.getItem("admintoken");

  return auth ? <Outlet /> : <Navigate to="/adminlogin" />;
};

export default AdminPrivateComponent;
