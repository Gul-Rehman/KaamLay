import React, { useState } from "react";
import { Avatar, Box, Grid, Rating } from "@mui/material";

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
  width: "auto",
  padding: "10px 16px",
  marginLeft: "auto",
  marginTop: 10,

  "&:hover": {
    color: "white",
    backgroundColor: "black",
  },
});

const ServiceCard = ({ details }) => {
  const navigate = useNavigate();
  const [ratingValue, setRatingValue] = useState(4);
  return (
    <>
      {/*  */}
      {/* Grid */}
      {/*  */}
      <Box
        component={Paper}
        elevation={6}
        sx={{
          flexGrow: 1,
          margin: 5,
          padding: 3,
          border: `2px solid ${ColorConfigs.primary}`,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={2} position="relative">
          <Grid item xs={8}>
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
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{}}>
            <Stack
              sx={{
                // position: "absolute",
                // right: 20,
                // top: 20,
                alignItems: "center",
                float: "right",
              }}
            >
              <Avatar
                alt="Service Provider Picture"
                src={`http://localhost:5000/${details.serviceproviderProfile?.profilepicture}`}
                sx={{
                  width: 150,
                  height: 150,
                  float: "right",
                  border: `3px solid ${ColorConfigs.primary}`,
                }}
              />
              <Typography>{details.serviceproviderName}</Typography>
              {/* <Rating
                name="read-only"
                value={ratingValue}
                readOnly
                sx={{ mt: 2 }}
              /> */}
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box>
              {details.serviceImage.length > 0 ? (
                details.serviceImage.map((item) => {
                  return (
                    <img
                      style={{
                        objectFit: "contain",
                        width: 100,
                        height: 100,
                        border: "1px solid gray",
                        borderRadius: 5,
                        marginTop: 4,
                      }}
                      src={`http://localhost:5000/${details.serviceImage}`}
                    />
                  );
                })
              ) : (
                <Typography color="primary">
                  *There are no images to show
                </Typography>
              )}
              {console.log(`http://localhost:5000/${details.serviceImage}`)}
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={
              {
                // border: "1px solid",
                // height: 150,
                // display: "flex",
                // alignItems: "stretch",
              }
            }
          >
            <Stack sx={{ mt: -5 }}>
              <Stack direction="row" sx={{ mt: 2 }}>
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
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              // float: "right",
              position: "relative",
              // border: "1px solid",
              // height: 150,
              // display: "flex",
              // alignItems: "stretch",
            }}
          >
            <CustomizedButton
              sx={{
                // float: "right",
                position: "absolute",
                bottom: 1,
                right: 1,
              }}
              // key={item.user._id}
              onClick={() => {
                localStorage.setItem("serviceId", details.serviceId);
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ServiceCard;
