import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ColorConfigs from "../../Configs/ColorConfigs";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      mobilemedium: 375,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

const CustomizedBox = styled(Box)({
  //   marginLeft: "20px",
  //   marginRight: "20px",
  marginTop: "10px",

  [theme.breakpoints.up("tablet")]: {
    width: "100%",
  },

  [theme.breakpoints.down("tablet")]: {
    marginBottom: "20px",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BookService() {
  const navigate = useNavigate();
  const theme = createTheme();
  const [open, setOpen] = useState(false);

  const showSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  const servicetypesValues = [
    "Plumbing",
    "Car Wash",
    "Painter",
    "Electrician",
    "Sofa Cleaning",
    "Home Appliances",
    "AC Services",
    "Carpenter",
  ];

  //   const [serviceType, setServiceType] = useState("");
  const [name, setName] = useState("");
  //   const [serviceDescription, setServiceDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [serviceproviderId, setServiceProviderId] = useState("");

  const data = {
    name: name,
    servicecategory: localStorage.getItem("servicetype"),
    contactnumber: contactnumber,
    address: address,
    serviceprovider: localStorage.getItem("serviceproviderId"),
  };
  const onsubmit = () => {
    axios
      .post("http://localhost:5000/api/service/bookservice", data, {
        headers: {
          authtoken: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        showSuccess();
        setTimeout(() => {
          navigate("/serviceproviderdashboard");
        }, 2000);
      })
      .catch((err) => {
        console.error(err.message);
      });
    // console.log(data);
    // showSuccess();
    // setTimeout(() => {
    //   navigate("/");
    // }, 2000);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          mb: 10,
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Book Service
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label=" Name"
              name="name"
              required
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              multiline
              rows={4}
              fullWidth
              required
              label=" Address"
              id="address"
              name="address"
              autoComplete="address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              id="contactnumber"
              label=" Contact Number"
              name="contactnumber"
              autoComplete="contactnumber"
              value={contactnumber}
              onChange={(event) => {
                setContactNumber(event.target.value);
              }}
            />

            {/* 
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            <Button
              //   type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: `${ColorConfigs.primary}` }}
              onClick={onsubmit}
            >
              Book Service
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", fontSize: "16pt" }}
        >
          Service Booked Successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}