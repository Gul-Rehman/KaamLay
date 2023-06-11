import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Stack, Typography, Switch } from "@mui/material";

import ColorConfigs from "../Configs/ColorConfigs";
import { useNavigate } from "react-router-dom";

const UserRole = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/userstatus/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("userrole", response.data.status);
        if (response.data.status == "serviceprovider") {
          setChecked(true);
        }
      })
      .catch((err) => {
        console.error(err);
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
          //   window.location.reload(true);
          //   navigate("/serviceproviderdashboard");
          navigate("/clientprofile");
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
          navigate("/clientprofile");
          //   navigate("/clientdashboard");
          //   window.location.reload(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <>
      <Box
        sx={
          {
            //   backgroundColor: `${ColorConfigs.lightorange}`,
          }
        }
      >
        <Stack direction="row" justifyContent="space-evenly">
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
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography>Currently :</Typography>
            {localStorage.getItem("userrole") == "client" && (
              <Typography> Client</Typography>
            )}
            {localStorage.getItem("userrole") == "serviceprovider" && (
              <Typography> Service Provider</Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default UserRole;
