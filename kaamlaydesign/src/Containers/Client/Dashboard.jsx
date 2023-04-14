import React, { useState, useEffect, createContext } from "react";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import Switch from "@mui/material/Switch";
import { Stack } from "@mui/material";
import ColorConfigs from "../../Configs/ColorConfigs";

const Dashboard = () => {
  const UserContext = createContext();
  // const [auth,setauth]=useState('');
  // useEffect(()=>{
  //   setauth(localStorage.getItem("user"));
  // })

  // a.setUserName("Logged In");
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
        // console.log(response.data.name);
        setName(response.data.name);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <>
      <Box
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
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "50px",
            fontFamily: "Cabin Condensed",
          }}
        >
          Welcome {name} as {localStorage.getItem("userrole")}
        </Typography>
      </Box>
      <UserContext.Provider>
        <></>
      </UserContext.Provider>
    </>
  );
};

export default Dashboard;
