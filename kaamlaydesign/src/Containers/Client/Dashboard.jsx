import React, { useState, useEffect, createContext } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Switch from "@mui/material/Switch";
import { Stack } from "@mui/material";
import ColorConfigs from "../../Configs/ColorConfigs";
import { Button } from "@mui/material";
import { ViewAgendaIcon } from "@mui/icons-material";

import ServicePending from "../../Assets/ServicesStatusImages/servicepending.svg";
import ServiceCompleted from "../../Assets/ServicesStatusImages/servicecompleted.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userrole") == "client") {
      setChecked(false);
      console.log("user role client");
    } else {
      // setChecked(true);
      console.log("user role service provider");
    }
    axios
      .get(
        `http://localhost:5000/api/profile/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        response.data.map((item) => {
          setImageUrl(item.profilepicture);
          localStorage.setItem("imageUrl", item.profilepicture);
        });

        console.log("url" + imageUrl);
      })
      .catch((err) => {
        console.error(err.message);
      });

    axios
      .get(
        `http://localhost:5000/api/getservices/getclientpendingservices/${localStorage.getItem(
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

    axios
      .get(
        `http://localhost:5000/api/getservices/getclientcompletedservices/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        // console.log(response.data);
        setCompletedServices(response.data);

        console.log(response.data);

        // setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      console.log("checked");
      axios
        .post(
          "http://localhost:5000/api/userstatus",
          { status: "serviceprovider" },
          {
            headers: {
              authtoken: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("userrole", "serviceprovider");
          navigate("/serviceproviderdashboard");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("unchecked");
      axios
        .post(
          "http://localhost:5000/api/userstatus",
          { status: "client" },
          {
            headers: {
              authtoken: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("userrole", "client");
          navigate("/clientdashboard");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/welcome", {
        headers: {
          authtoken: `${token}`,
        },
      })
      .then((response) => {
        setName(response.data.name);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const [pendingServices, setPendingServices] = useState([]);
  const [completedServices, setCompletedServices] = useState([]);

  return (
    <>
      <Box
        sx={{
          m: 5,
        }}
      >
        <Stack direction="row" sx={{}}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 20,
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={() => {
              navigate("/requestservice");
            }}
            startIcon={<AddIcon fontSize="large" />}
          >
            Request Service
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 20,
              fontWeight: "bold",
              fontSize: "1rem",
              alignSelf: "flex-end",
              ml: 2,
            }}
            onClick={() => {
              navigate("/clientrequestedservices");
            }}
            startIcon={<VisibilityIcon fontSize="large" />}
          >
            View Requested Services
          </Button>
        </Stack>
      </Box>

      <Grid
        container
        spacing={{ xs: 1, laptops: 3 }}
        padding={{ xs: 1, mobilel: 1, laptopl: 3 }}
        height="100vh"
        marginBottom={7}
      >
        <Grid item xs={12} tablet={12} laptops={6} position="relative">
          <Box
            component={Paper}
            width="100%"
            height={400}
            sx={{
              position: "relative",
              backgroundColor: "#fba56c",
              cursor: "pointer",
            }}
            borderRadius={5}
            elevation={5}
            onClick={() => {
              navigate("/clientbookedservices");
            }}
          >
            <Box padding={3}>
              <Stack
                display="inline-block"
                width={350}
                sx={{ position: "relative" }}
              >
                <Typography fontSize={35}> Booked Services </Typography>
                <Typography fontSize={{ xs: 13, mobilel: 20 }}>
                  Please wait for service provider to reach out to you.
                </Typography>
              </Stack>
              <Typography
                fontSize={{ xs: 100, mobilel: 180 }}
                sx={{ position: "absolute", bottom: 0 }}
              >
                {pendingServices.length}
              </Typography>
              <Box
                component="img"
                sx={{
                  height: 200,
                  width: 300,
                  float: "right",
                }}
                alt="Pending Services Icon"
                src={ServicePending}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} tablet={12} laptops={6} position="relative">
          <Box
            component={Paper}
            width="100%"
            height={400}
            sx={{
              position: "relative",
              backgroundColor: "#fba56c",
              cursor: "pointer",
            }}
            borderRadius={5}
            elevation={5}
            onClick={() => {
              navigate("/clientcompletedservices");
            }}
          >
            <Box padding={3}>
              <Stack
                display="inline-block"
                width={350}
                sx={{ position: "relative" }}
              >
                <Typography fontSize={35}> Completed Services </Typography>
                <Typography fontSize={{ xs: 13, mobilel: 20 }}>
                  See Your Services History
                </Typography>
              </Stack>
              <Typography
                fontSize={{ xs: 100, mobilel: 180 }}
                sx={{ position: "absolute", bottom: 0 }}
              >
                {completedServices.length}
              </Typography>
              <Box
                component="img"
                sx={{
                  height: 200,
                  width: 300,

                  float: "right",
                }}
                alt="Pending Services Icon"
                src={ServiceCompleted}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* <GeoLocation /> */}
    </>
  );
};

export default Dashboard;
