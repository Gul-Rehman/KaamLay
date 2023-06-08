import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
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
  const [dummyState, setDummyState] = useState(false);

  const triggerRerender = () => {
    setDummyState(!dummyState); // Toggle the dummy state
  };
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  // const [servicePrice, setServicePrice] = useState("");
  // const [contactnumber, setContactNumber] = useState("");
  // const [serviceproviderId, setServiceProviderId] = useState("");

  const [serviceprovidername, setServiceProviderName] = useState("");
  const [serviceproviderphonenumber, setserviceproviderPhoneNumber] =
    useState("");
  const [serviceprice, setServicePrice] = useState("");

  // client information variables
  const [clientName, setClientName] = useState("");
  const [clientcontactnumber, setClientContactNumber] = useState("");
  const [clientaddress, setClientAddress] = useState("");

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
        <Box>
          <Typography>There Are No Completed Services To Show</Typography>
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
