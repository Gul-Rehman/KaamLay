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
import OfferCard from "../../Components/Client/OfferCard";

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

const SeeOffers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/offer/${localStorage.getItem(
          "requestedServiceId"
        )}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        response.data.map((item) => {
          setOffers(item.offers);
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  // console.log(serviceproviderId);

  const [offers, setOffers] = useState([]);
  // console.log(services);
  console.log(offers);
  return (
    <>
      {offers.length <= 0 ? (
        <Box
          sx={{
            display: "flex",

            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={50}>There Are No Offers To Show</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 10,
          }}
        >
          {offers?.map((item) => {
            return (
              <OfferCard
                details={{
                  serviceProposal: item.serviceproposal,

                  serviceproviderName: item.user ? item.user.name : "",
                  serviceproviderPicture: item.user
                    ? item.user.profile.profilepicture
                    : "",
                  serviceproviderContactNumber: item ? item.contactnumber : "",
                  serviceCharges: item ? item.serviceprice : "",
                  serviceproviderId: item.user ? item.user._id : "",
                }}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default SeeOffers;
