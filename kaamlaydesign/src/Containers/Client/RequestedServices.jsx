import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack, display, flexbox } from "@mui/system";
import ColorConfigs from "../../Configs/ColorConfigs";
// import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import { BookedServiceCard } from "../../Components";
import RequestedServiceCard from "../../Components/Client/RequestedServiceCard";

const CustomizedButton = styled(Button)({
  backgroundColor: `${ColorConfigs.primary}`,
  borderRadius: 8,
  color: "white",
  width: "30%",
  // marginLeft: "auto",
  marginLeft: 20,
  width: 400,
  "&:hover": {
    color: "white",
    backgroundColor: "black",
  },
});

const RequestedServices = () => {
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/service/requestedservices/user/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        console.log(response.data);

        setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  // console.log(serviceproviderId);
  const deleteService = async (serviceId) => {
    console.log("hello from delete");

    await axios
      .delete(`http://localhost:5000/api/service/requestservice/${serviceId}`)
      .then((response) => {
        console.log(response);
        setServices(services.filter((item) => item._id !== serviceId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [services, setServices] = useState([]);
  // console.log(services);
  return (
    <>
      {services.length == 0 ? (
        <Box
          sx={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={50}>
            There Are No Requested Services To Show
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 10,
          }}
        >
          {services.map((item, index) => {
            return (
              <RequestedServiceCard
                key={index}
                details={{
                  serviceTitle: item.servicetitle,
                  serviceDescription: item.servicedescription,
                  serviceCategory: item.servicecategory,
                  clientPicture: item.user.profile.profilepicture,
                  clientContactNumber: item.contactnumber,
                  clientName: item.user.name,
                  serviceId: item._id,
                  clientAddress: item.address,

                  serviceImages: item.imageUrls,
                }}
                deleteItem={deleteService}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default RequestedServices;
