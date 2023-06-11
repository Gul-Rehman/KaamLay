import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import ColorConfigs from "../../Configs/ColorConfigs";

import { Button } from "@mui/material";
import { styled } from "@mui/material";
import {
  BookedServiceCard,
  ClientBookedServiceCard,
  ClientCBookedServiceCard,
} from "../../Components";

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

const BookedServices = () => {
  const navigate = useNavigate();

  // client information variables

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/getservices/getclientpendingservices/${localStorage.getItem(
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

  const [services, setServices] = useState([]);
  // console.log(services);
  return (
    <>
      {services.length <= 0 ? (
        <Box
          sx={{
            display: "flex",

            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={50}>
            There Are No Booked Services To Show
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 10,
          }}
        >
          {services?.map((item) => {
            return (
              <ClientBookedServiceCard
                details={{
                  serviceTitle: item.serviceId ? (
                    item.serviceId.servicetitle
                  ) : (
                    <Typography
                      fontFamily={"DenseLetters"}
                      color={"red"}
                      fontSize={30}
                    >
                      Service Deleted By Service Provider
                    </Typography>
                  ),
                  serviceDescription: item.serviceId
                    ? item.serviceId.servicedescription
                    : "",
                  serviceCategory: item.serviceId
                    ? item.serviceId.servicecategory
                    : "",
                  serviceproviderName: item.serviceId
                    ? item.serviceId.user.name
                    : "",
                  serviceproviderPicture: item.serviceId
                    ? item.serviceId.user.profile.profilepicture
                    : "",
                  serviceproviderContactNumber: item.serviceId
                    ? item.serviceId.contactnumber
                    : "",
                  serviceCharges: item.serviceId ? item.serviceId.price : "",
                  clientName: item.name,
                  clientContactNumber: item.contactnumber,
                  clientAddress: item.address,
                  serviceproviderId: item._id,
                  serviceImages: item.serviceId ? item.serviceId.imageUrls : "",
                }}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default BookedServices;
