import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import ColorConfigs from "../../Configs/ColorConfigs";

const PostedServices = () => {
  const [serviceType, setServiceType] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [contactnumber, setContactNumber] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/service/${localStorage.getItem("userId")}`
      )
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
    <Box
      sx={{
        mb: 10,
        height: "auto",
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
              position: "relative",
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
                  {item.servicetitle}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "GrayText",
                  }}
                >
                  {item.servicedescription}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "black",
                  }}
                >
                  Service Category:
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    color: "GrayText",
                  }}
                >
                  {item.servicecategory}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "black",
                  }}
                >
                  Contact Number:
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
                  {item.price}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                float: "right",
              }}
            >
              <Stack></Stack>
              <Button variant="contained">Delete Service</Button>
              <Button variant="contained">Edit Service</Button>
            </Stack>
            <Box>
              <img
                style={{
                  objectFit: "contain",
                  width: 300,
                  height: 200,
                  border: "1px solid gray",
                  borderRadius: 5,
                  marginTop: 4,
                }}
                src={`http://localhost:5000/${item.imageUrl}`}
              />
              {console.log(`http://localhost:5000/${item.imageUrl}`)}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PostedServices;
