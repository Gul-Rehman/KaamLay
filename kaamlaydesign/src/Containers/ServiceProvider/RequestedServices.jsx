import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ServiceProviderRequestedServiceCard } from "../../Components";

const RequestedServices = () => {
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/service/requestedservices/allservices`)
      .then((response) => {
        // console.log(response.data);
        setRequestedServices(response.data);

        console.log(response.data);

        // setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  const [requestedServices, setRequestedServices] = useState([]);
  return (
    <>
      {requestedServices.length <= 0 ? (
        <>
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3"> There Are No Pending Services</Typography>
          </Box>
        </>
      ) : (
        requestedServices?.map((item) => {
          return (
            <>
              <ServiceProviderRequestedServiceCard
                details={{
                  serviceTitle: item.servicetitle ? (
                    item.servicetitle
                  ) : (
                    <Typography
                      fontFamily={"DenseLetters"}
                      color={"red"}
                      fontSize={30}
                    >
                      Service Deleted By Service Provider
                    </Typography>
                  ),
                  serviceDescription: item ? item.servicedescription : "",
                  serviceCategory: item ? item.servicecategory : "",

                  clientPicture: item.user
                    ? item.user.profile.profilepicture
                    : "",

                  clientName: item.user.name,
                  clientContactNumber: item.contactnumber,
                  clientAddress: item.address,
                  clientPinLocation: item.pinLocation,
                  requestedServiceId: item._id,

                  serviceImages: item ? item.imageUrls : "",
                }}
                // completeService={completeService}
              />
            </>
          );
        })
      )}
    </>
  );
};

export default RequestedServices;
