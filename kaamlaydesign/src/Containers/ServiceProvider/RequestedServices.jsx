import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const RequestedServices = () => {
  const [requestedServices, setRequestedServices] = useState([]);
  return requestedServices.length <= 0 ? (
    <>
      <Box
        sx={{
          display: "flex",

          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography fontSize={50}>
          There Are No Requested Services To Show
        </Typography>
      </Box>
    </>
  ) : (
    <div>Service Provider RequestedServices</div>
  );
};

export default RequestedServices;
