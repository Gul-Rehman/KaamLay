import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ServiceProviderPrivateComponent = () => {
  const verification = localStorage.getItem("serviceproviderverification");
  return verification ? (
    <Outlet />
  ) : (
    <Navigate to="/serviceproviderverificationmessage" replace={true} />
  );
};

export default ServiceProviderPrivateComponent;
