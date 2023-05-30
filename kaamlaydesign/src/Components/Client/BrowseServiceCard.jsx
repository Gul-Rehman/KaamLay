import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import ColorConfigs from "../../Configs/ColorConfigs";
import { Button } from "@mui/material";
import { styled } from "@mui/material";

const CustomizedButton = styled(Button)({
  backgroundColor: `${ColorConfigs.primary}`,
  borderRadius: 8,
  color: "white",
  width: "30%",
  marginLeft: "auto",
  marginTop: 10,
  width: 400,
  "&:hover": {
    color: "white",
    backgroundColor: "black",
  },
});

const ServiceCard = ({ details }) => {
  const navigate = useNavigate();
  return (
    <Box
      component={Paper}
      elevation={8}
      sx={{
        margin: 5,
        padding: 3,
        border: `2px solid ${ColorConfigs.primary}`,
        borderRadius: 4,
        // boxShadow: 7,
        // backgroundColor: `${ColorConfigs.lightorange}`,
        // backgroundColor: "white",
      }}
    >
      <Stack>
        <Stack direction="row">
          <Typography
            sx={{
              fontSize: 40,
              color: `${ColorConfigs.primary}`,
            }}
          >
            {details.serviceTitle}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography
            sx={{
              fontSize: 20,
              color: "GrayText",
            }}
          >
            {details.serviceDescription}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Stack direction="row" sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "black",
                }}
              >
                Service Category:
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "GrayText",
                }}
              >
                {details.serviceCategory}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "black",
                }}
              >
                Contact Number:
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "GrayText",
                }}
              >
                {details.contactNumber}
              </Typography>
            </Stack>

            <Stack direction="row" sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "black",
                }}
              >
                Price:
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "GrayText",
                }}
              >
                {details.serviceCharges}
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            <CustomizedButton
              // key={item.user._id}
              onClick={() => {
                localStorage.setItem(
                  "serviceproviderId",
                  details.serviceproviderId
                );
                localStorage.setItem("servicetype", "plumbing");
                navigate("/clientbookservice");
              }}
            >
              {" "}
              Book Service
            </CustomizedButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ServiceCard;
