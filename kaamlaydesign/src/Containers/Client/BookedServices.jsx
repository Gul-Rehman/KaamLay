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
        `http://localhost:5000/api/service/bookservice/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        console.log(response.data);
        // console.log("Service Provider Name" + response.data);
        let fetcheddata = response.data.map((item) => {
          // setServiceProviderId(item);
          // setServiceProviderName
          // console.log("Service Provider Name" + item);

          // console.log(JSON.stringify(item)); //{"id":"007","name":"James Bond"}
          // if (item.hasOwnProperty("serviceprovider")) {
          //   // console.log(item.serviceprovider);
          //   // setServiceProviderName();
          //   //007
          // }

          return item;
        });
        // console.log("Fetched Ids " + fetcheddata);
        // setServiceProviderId(JSON.stringify(ids));
        // console.log(serviceproviderId);
        setServices(response.data);
        // console.log(services);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  // console.log(serviceproviderId);

  const [services, setServices] = useState([]);
  // console.log(services);
  return (
    <Box
      sx={{
        mb: 10,
      }}
    >
      {services.map((item) => {
        // const data = {
        //   serviceTitle: item.serviceprovider.servicetitle,
        //   serviceDescription: item.serviceprovider.servicedescription,
        //   serviceCategory: item.serviceprovider.servicecategory,
        //   serviceproviderContactNumber: item.serviceprovider.contactnumber,
        //   serviceCharges: item.serviceprovider.price,
        //   clientName: item.name,
        //   clientContactNumber: item.contactnumber,
        //   clientAddress: item.address,
        //   serviceproviderId: item._id,
        // };

        return (
          <BookedServiceCard
            details={{
              serviceTitle: item.serviceprovider.servicetitle,
              serviceDescription: item.serviceprovider.servicedescription,
              serviceCategory: item.serviceprovider.servicecategory,
              serviceproviderContactNumber: item.serviceprovider.contactnumber,
              serviceCharges: item.serviceprovider.price,
              clientName: item.name,
              clientContactNumber: item.contactnumber,
              clientAddress: item.address,
              serviceproviderId: item._id,
            }}
          />
        );
      })}
    </Box>
  );
};

export default BookedServices;
