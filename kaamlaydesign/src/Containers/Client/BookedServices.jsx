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
  return (
    <Box
      sx={{
        mb: 10,
      }}
    >
      {services.map((item) => {
        return (
          <Box
            component={Paper}
            elevation={4}
            sx={{
              margin: 5,
              padding: 3,
              border: `2px solid ${ColorConfigs.primary}`,
              borderRadius: 4,
            }}
          >
            <Stack>
              <Stack direction="row">
                <Typography
                  sx={{
                    fontSize: 40,
                    color: `${ColorConfigs.primary}`,
                  }}
                >
                  {item.serviceprovider.servicetitle}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "GrayText",
                  }}
                >
                  {item.serviceprovider.servicedescription}
                </Typography>
              </Stack>
              <Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    padding: "0px 50px",
                  }}
                >
                  <Stack>
                    <Stack direction="row" sx={{ mt: 3 }}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "black",
                        }}
                      >
                        Service Category:
                      </Typography>
                      {/* <Stack direction></Stack> */}

                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "GrayText",
                        }}
                      >
                        {item.serviceprovider.servicecategory}
                      </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "black",
                        }}
                      >
                        Service Provider Contact Number:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "GrayText",
                        }}
                      >
                        {item.serviceprovider.contactnumber}
                      </Typography>
                    </Stack>

                    <Stack direction="row" sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "black",
                        }}
                      >
                        Price:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "GrayText",
                        }}
                      >
                        {item.serviceprovider.price}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack sx={{ mt: 3 }}>
                    <Stack>
                      <Stack direction="row">
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: "black",
                          }}
                        >
                          Your Name:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: "GrayText",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Stack>
                      <Stack direction="row">
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: "black",
                          }}
                        >
                          Your Contact Number:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: "GrayText",
                          }}
                        >
                          {item.contactnumber}
                        </Typography>
                      </Stack>
                      <Stack direction="row">
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: "black",
                          }}
                        >
                          Your Address:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: "GrayText",
                          }}
                        >
                          {item.address}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack alignItems="center">
              <Stack direction="row" mt={3}>
                <CustomizedButton
                  // key={item.user._id}
                  onClick={() => {
                    localStorage.setItem("serviceproviderId", item._id);
                    localStorage.setItem("servicetype", "plumbing");
                    // navigate("/clientbookservice");
                  }}
                >
                  {" "}
                  Edit Service
                </CustomizedButton>
                <CustomizedButton
                  // key={item.user._id}
                  onClick={() => {
                    localStorage.setItem("serviceproviderId", item._id);
                    localStorage.setItem("servicetype", "plumbing");
                    // navigate("/clientbookservice");
                  }}
                >
                  {" "}
                  Cancel Service
                </CustomizedButton>
              </Stack>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default BookedServices;
