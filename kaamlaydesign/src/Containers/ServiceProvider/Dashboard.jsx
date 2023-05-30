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

const Dashboard = () => {
  // const [auth,setauth]=useState('');
  // useEffect(()=>{
  //   setauth(localStorage.getItem("user"));
  // })
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState("");
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
    // console.log("Hello " + localStorage.getItem("userrole"));
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
      {/* <Box
        sx={{
          backgroundColor: `${ColorConfigs.lightorange}`,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
          }}
        >
          <Typography>Switch Role</Typography>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography>
            Currently : {localStorage.getItem("userrole")}
          </Typography>
        </Stack>
      </Box> */}
      <Box
        sx={{
          m: 5,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/serviceproviderpostservice");
            }}
            startIcon={<AddIcon fontSize="large" />}
            style={{ borderRadius: 20, fontWeight: "bold", fontSize: "1rem" }}
          >
            Post Service
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={3} padding={4} height="100vh">
        <Grid item laptops={6} position="relative">
          <Box
            component={Paper}
            width="100%"
            height={400}
            sx={{
              position: "relative",
              backgroundColor: "#fba56c",
            }}
            borderRadius={5}
            elevation={5}
          >
            <Box padding={3}>
              <Stack
                display="inline-block"
                width={350}
                sx={{ position: "relative" }}
              >
                <Typography fontSize={35}> Pending Services </Typography>
                <Typography fontSize={15}>
                  Don't keep your clients waiting any longer. Complete the
                  pending services and earn more money
                </Typography>
              </Stack>
              <Typography
                fontSize={180}
                sx={{ position: "absolute", bottom: 0 }}
              >
                2
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

        <Grid item laptops={6} position="relative">
          <Box
            component={Paper}
            width="100%"
            height={400}
            sx={{
              position: "relative",
              backgroundColor: "#fba56c",
            }}
            borderRadius={5}
            elevation={5}
          >
            <Box padding={3}>
              <Stack
                display="inline-block"
                width={350}
                sx={{ position: "relative" }}
              >
                <Typography fontSize={35}> Completed Services </Typography>
                <Typography fontSize={15}>
                  You have completed the services, Great Work
                </Typography>
              </Stack>
              <Typography
                fontSize={180}
                sx={{ position: "absolute", bottom: 0 }}
              >
                6
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
    </>
  );
};

export default Dashboard;
