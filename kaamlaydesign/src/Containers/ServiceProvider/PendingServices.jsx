import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const PendingServices = () => {
  const [serviceCount, setServiceCount] = useState(0);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {serviceCount == 0 && (
            <Typography variant="h3"> There Are No Pending Services</Typography>
          )}{" "}
        </Box>
      </Box>
    </>
  );
};

export default PendingServices;
