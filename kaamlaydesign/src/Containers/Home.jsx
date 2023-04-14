import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Hero, Sections } from "../Components";
import { ServiceCategories } from "../Components";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userrole") == "client") {
      navigate("/clientdashboard");
    }
    if (localStorage.getItem("userrole") == "serviceprovider") {
      navigate("/serviceproviderdashboard");
    }
  });
  return (
    <>
      <Box
        sx={{
          // width: "100%",
          mb: "50px",
        }}
      >
        <Hero />
        <Sections />
        <ServiceCategories />
      </Box>
    </>
  );
};

export default Home;
