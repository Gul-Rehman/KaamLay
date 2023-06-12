import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClientCompletedServiceCard } from "../../Components";

const CompletedServices = () => {
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/getservices/getclientcompletedservices/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        // console.log(response.data);
        setCompletedServices(response.data);
        // setShowCircularProgress(false);
        console.log(response.data);

        // setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const [completedServices, setCompletedServices] = useState([]);
  return (
    <>
      {completedServices.length <= 0 ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            There Are No Completed Services To Show
          </Typography>
        </Box>
      ) : (
        completedServices?.map((item) => {
          return item.serviceId ? (
            <>
              <ClientCompletedServiceCard
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
          ) : (
            // <p>asdsa</p>

            <ClientCompletedServiceCard
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
                clientContactNumber: item.contactnumber,
                clientAddress: item.address,
                serviceproviderId: item.serviceproviderId._id,
                serviceImages: item ? item.serviceimages : "",
              }}
            />
          );
        })
      )}
    </>
  );
};

export default CompletedServices;
