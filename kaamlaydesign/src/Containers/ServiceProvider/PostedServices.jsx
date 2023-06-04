import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Grid, Rating } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack, color } from "@mui/system";
import ColorConfigs from "../../Configs/ColorConfigs";
import styled from "@mui/material";
import PostedServiceCard from "../../Components/ServiceProvider/PostedServiceCard";

const PostedServices = () => {
  const [serviceType, setServiceType] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/service/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const [services, setServices] = useState([]);
  const [ratingValue, setRatingValue] = useState(4);
  return (
    <>
      <Box
        sx={{
          mb: 10,
          height: "auto",
        }}
      >
        {services.map((item) => {
          return (
            <>
              {/* <Box
                component={Paper}
                elevation={4}
                sx={{
                  margin: 5,
                  padding: 3,
                  border: `2px solid ${ColorConfigs.primary}`,
                  borderRadius: 4,
                  position: "relative",
                }}
              >
                <Stack>
                  <Stack direction="row">
                    <Typography
                      sx={{
                        fontSize: 40,
                        color: `${ColorConfigs.primary}`,
                        position: "relative",
                      }}
                    >
                      {item.servicetitle}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      sx={{
                        fontSize: 20,
                        color: "GrayText",
                      }}
                    >
                      {item.servicedescription}
                    </Typography>
                    <Stack
                      sx={{
                        position: "absolute",
                        right: 20,
                        top: 20,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt="Service Provider Picture"
                        src={`http://localhost:5000/${item.user.profile.profilepicture}`}
                        sx={{
                          width: 150,
                          height: 150,
                          float: "right",
                          border: `3px solid ${ColorConfigs.primary}`,
                        }}
                      />
                      <Typography>{item.user.name}</Typography>
                      <Rating name="read-only" value={ratingValue} readOnly />
                    </Stack>
                  </Stack>
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
                      {item.servicecategory}
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
                      {item.contactnumber}
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
                      {item.price}
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    float: "right",
                    display: "flex",
                    mt: 4,
                    // width: "30%",
                  }}
                >
                  <Stack
                    sx={{
                      justifyContent: "space-between",
                      alignContent: "space-between",
                    }}
                  >
                    <Button variant="contained">Delete Service</Button>
                    <Button variant="contained">Edit Service</Button>
                  </Stack>
                </Box>
                <Box>
                  <img
                    style={{
                      objectFit: "contain",
                      width: 150,
                      height: 150,
                      border: "1px solid gray",
                      borderRadius: 5,
                      marginTop: 4,
                    }}
                    src={`http://localhost:5000/${item.imageUrl}`}
                  />
                  {console.log(`http://localhost:5000/${item.imageUrl}`)}
                </Box>
              </Box> */}
              <PostedServiceCard
                details={{
                  serviceTitle: item.servicetitle,
                  serviceDescription: item.servicedescription,
                  serviceproviderPicture: item.user.profile.profilepicture,
                  serviceproviderName: item.user.name,
                  serviceCategory: item.servicecategory,
                  serviceproviderContactNumber: item.contactnumber,
                  serviceCharges: item.price,
                  serviceImage: item.imageUrl,
                  serviceImages: item.imageUrls,
                }}
              />
            </>
          );
        })}
      </Box>
    </>
  );
};

export default PostedServices;
