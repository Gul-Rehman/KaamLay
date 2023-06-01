import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const CompletedServices = () => {
  const [services, setServices] = useState("");
  return (
    <>
      {services.length == 0 ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            There Are No Completed Services To Show
          </Typography>
        </Box>
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export default CompletedServices;
