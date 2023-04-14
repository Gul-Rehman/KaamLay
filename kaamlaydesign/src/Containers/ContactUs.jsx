import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ColorConfigs from "../Configs/ColorConfigs";
const ContactUs = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          backgroundColor: `${ColorConfigs.primary}`,
          // alignItems: "center",
        }}
      >
        <Box display="block">
          <Typography
            sx={{
              fontSize: "50px",
              fontFamily: "Cabin Condensed",
              mt: 10,
            }}
          >
            If You Have Any Queries Please Send Us An Email
          </Typography>
          <Typography
            sx={{
              fontSize: "50px",
              fontFamily: "Cabin Condensed",
              mt: 10,
              textAlign: "center",
            }}
          >
            project.kaamlay@gmail.com
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;
