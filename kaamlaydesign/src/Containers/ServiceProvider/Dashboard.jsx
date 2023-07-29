import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import ColorConfigs from "../../Configs/ColorConfigs";
import ServicePending from "../../Assets/ServicesStatusImages/servicepending.svg";
import ServiceCompleted from "../../Assets/ServicesStatusImages/servicecompleted.svg";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ReverseGeocodingMap from "../../Components/ReverseGeocodingMap";

const Dashboard = () => {
  // const [auth,setauth]=useState('');
  // useEffect(()=>{
  //   setauth(localStorage.getItem("user"));
  // })
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    // const userrole = JSON.parse(localStorage.getItem("userrole"));
    if (localStorage.getItem("userrole") == "client") {
      setChecked(false);
      console.log("user role client");
      // localStorage.setItem("userrole", "client");
    } else {
      setChecked(true);
      console.log("user role service provider");
      // localStorage.setItem("userrole", "serviceprovider");
    }
    axios
      .get(
        `http://localhost:5000/api/profile/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        // console.log(response.data);
        response.data.map((item) => {
          setImageUrl(item.profilepicture);
          localStorage.setItem("imageUrl", item.profilepicture);
        });

        console.log("url" + imageUrl);

        // setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
    // console.log("Hello " + localStorage.getItem("userrole"));

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

    axios
      .get(
        `http://localhost:5000/api/getservices/getserviceprovidercompletedservices/${localStorage.getItem(
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
  const [pendingServices, setPendingServices] = useState([]);
  const [completedServices, setCompletedServices] = useState([]);
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
        console.log(response.data.name);
        setName(response.data.name);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
  // const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          m: 5,
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          sx={{
            // alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/serviceproviderpostservice");
            }}
            startIcon={<AddIcon fontSize="large" />}
            sx={{ borderRadius: 20, fontWeight: "bold", fontSize: "1rem" }}
          >
            Post Service
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/serviceproviderrequestedservices");
            }}
            startIcon={<ViewAgendaIcon fontSize="large" />}
            sx={{
              borderRadius: 20,
              fontWeight: "bold",
              fontSize: "1rem",
              float: "inline-end",
              ml: 2,
            }}
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
              navigate("/serviceproviderpendingservices");
            }}
          >
            <Box padding={3}>
              <Stack
                display="inline-block"
                width={350}
                sx={{ position: "relative" }}
              >
                <Typography fontSize={35}> Pending Services </Typography>
                <Typography fontSize={{ xs: 13, mobilel: 20 }}>
                  Don't keep your clients waiting any longer. Complete the
                  pending services and earn more money
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
              navigate("/serviceprovidercompletedservices");
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
                  You have completed the services, Great Work
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
      {/* <Box sx={{ width: "100%", height: 400 }}>
        <ReverseGeocodingMap latitude={40.714224} longitude={-73.961452} />
      </Box> */}
    </>
  );
};

export default Dashboard;
