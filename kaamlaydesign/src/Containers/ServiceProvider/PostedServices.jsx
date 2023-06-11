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
              <PostedServiceCard
                details={{
                  serviceTitle: item.servicetitle,
                  serviceDescription: item.servicedescription,
                  serviceproviderPicture: item.user.profile.profilepicture,
                  serviceproviderName: item.user.name,
                  serviceCategory: item.servicecategory,
                  serviceproviderContactNumber: item.contactnumber,
                  serviceCharges: item.price,
                  // serviceImage: item.imageUrl,
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
