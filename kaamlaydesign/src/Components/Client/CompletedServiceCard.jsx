import React, { useState } from "react";
import { Avatar, Box, Grid, Rating } from "@mui/material";

import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import ColorConfigs from "../../Configs/ColorConfigs";

const CompletedServiceCard = ({ details }) => {
  console.log("Hello From Card Component");

  const [ratingValue, setRatingValue] = useState(4);
  return (
    <>
      <Box
        component={Paper}
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
                alignItems: "center",
                float: "right",
              }}
            >
              <Avatar
                alt="Service Provider Picture"
                src={`http://localhost:5000/${details.serviceproviderPicture}`}
                sx={{
                  width: 150,
                  height: 150,
                  float: "right",
                  border: `3px solid ${ColorConfigs.primary}`,
                }}
              />
              <Typography>{details.serviceproviderName}</Typography>
              <Rating
                name="read-only"
                value={ratingValue}
                readOnly
                sx={{ mt: 2 }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box>
              {details.serviceImages.length > 0 ? (
                details.serviceImages.map((item) => {
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
                      src={`http://localhost:5000/${item}`}
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
          <Grid item xs={12}>
            <Stack>
              <Stack direction="row" justifyContent="space-between">
                {details.serviceCharges && (
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
                      {/* <Stack direction></Stack> */}

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
                        Service Provider Contact Number:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "GrayText",
                        }}
                      >
                        {details.serviceproviderContactNumber}
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
                )}
                <Stack sx={{ mt: 3 }}>
                  <Stack>
                    <Stack direction="row">
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "black",
                        }}
                      >
                        Your Name:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "GrayText",
                        }}
                      >
                        {details.clientName}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "black",
                        }}
                      >
                        Your Contact Number:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "GrayText",
                        }}
                      >
                        {details.clientContactNumber}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "black",
                        }}
                      >
                        Your Address:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "GrayText",
                        }}
                      >
                        {details.clientAddress}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompletedServiceCard;
