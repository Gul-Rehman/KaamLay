import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import ColorConfigs from "../../Configs/ColorConfigs";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import BrowseServiceCard from "../Client/BrowseServiceCard";

// const CustomizedButton = styled(Button)({
//   backgroundColor: `${ColorConfigs.primary}`,
//   borderRadius: 8,
//   color: "white",
//   width: "30%",
//   marginLeft: "auto",
//   marginTop: 10,
//   width: 400,
//   "&:hover": {
//     color: "white",
//     backgroundColor: "black",
//   },
// });

const PlumbingService = () => {
  // const [serviceType, setServiceType] = useState("");
  // const [serviceTitle, setServiceTitle] = useState("");
  // const [serviceDescription, setServiceDescription] = useState("");
  // const [serviceCharges, setServiceCharges] = useState("");
  // const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();
  const [serviceproviderId, setServiceProviderId] = useState("");

  // const [details, setDetails] = useState({
  //   serviceType: "",
  //   serviceTtile: "",
  //   serviceDescription: "",
  //   serviceCharges: "",
  // });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/service/servicecategory/Plumbing`)
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const [services, setServices] = useState([]);
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
            There Are No Posted Services To Show
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 10,
          }}
        >
          {services.map((item) => {
            return (
              <BrowseServiceCard
                details={{
                  serviceTitle: item.servicetitle,
                  serviceDescription: item.servicedescription,
                  serviceCharges: item.price,
                  serviceType: item.servicecategory,
                  contactNumber: item.contactnumber,
                  serviceId: item._id,
                  serviceproviderId: item.user._id,
                  serviceproviderProfile: item.user.profile,
                  serviceproviderName: item.user.name,
                  serviceImage: item.imageUrls,
                }}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default PlumbingService;
