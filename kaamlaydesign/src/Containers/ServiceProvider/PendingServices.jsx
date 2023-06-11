import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PendingServiceCard,
  ServiceProviderPendingServiceCard,
} from "../../Components";

const PendingServices = () => {
  const [serviceCount, setServiceCount] = useState(0);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/getservices/getserviceproviderpendingservices/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        // console.log(response.data);
        setPendingServices(response.data);

        console.log(response.data);

        // setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  const [pendingServices, setPendingServices] = useState([]);
  return (
    <>
      {pendingServices.length <= 0 ? (
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
        pendingServices?.map((item) => {
          return (
            <>
              <ServiceProviderPendingServiceCard
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
                  clientPinLocation: item.pinLocation,
                  bookedServiceId: item._id,
                  serviceImages: item.serviceId ? item.serviceId.imageUrls : "",
                }}
              />
            </>
          );
        })
      )}
    </>
  );
};

export default PendingServices;
