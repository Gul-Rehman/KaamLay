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

  const completeService = async (bookedServiceId) => {
    await axios
      .put(
        `http://localhost:5000/api/getservices/updateservicestatus/${bookedServiceId}/completed`
      )
      .then((response) => {
        console.log(response);
        setPendingServices(
          pendingServices.filter((item) => item._id !== bookedServiceId)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          return item.serviceId ? (
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
                completeService={completeService}
              />
            </>
          ) : (
            // <p>asdsa</p>

            <ServiceProviderPendingServiceCard
              details={{
                serviceTitle: item ? (
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
                serviceproviderName: item.serviceproviderId
                  ? item.serviceproviderId.name
                  : "",
                serviceproviderPicture: item.serviceproviderId
                  ? item.serviceproviderId.profile.profilepicture
                  : "",
                serviceproviderContactNumber: item
                  ? item.serviceprovidercontactnumber
                  : "",
                serviceCharges: item ? item.offerprice : "",
                clientName: item.name,
                clientPinLocation: item.pinLocation,
                clientContactNumber: item.contactnumber,
                clientAddress: item.address,
                serviceproviderId: item.serviceproviderId._id,
                bookedServiceId: item._id,
                serviceImages: item ? item.serviceimages : "",
              }}
              completeService={completeService}
            />
          );
        })
      )}
    </>
  );
};

export default PendingServices;
