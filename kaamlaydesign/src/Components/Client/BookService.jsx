import React, { useState } from "react";
import GetGeoLocationWithCoordinates from "../GetLocationWithCoordinates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ColorConfigs from "../../Configs/ColorConfigs";
import { Paper, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import ChatGPTMap from "../ChatGPTMap";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BookService() {
  // const handleRefresh = () => {
  //   window.location.reload(); // Reload the entire web app
  // };
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const navigate = useNavigate();

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

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [serviceproviderId, setServiceProviderId] = useState("");
  const [pinLocation, setPinLocation] = useState({
    coordinates: {
      latitude: "",
      longitude: "",
    },
    address: "",
  });

  const data = {
    name: name,
    servicecategory: localStorage.getItem("servicetype"),
    contactnumber: contactnumber,
    address: address,
    serviceprovider: localStorage.getItem("serviceproviderId"),
    pinLocation,
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

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const API_KEY = "AIzaSyCR4YVEYed8oq1-QWV5hGhV1kbAAwzqb9Y";
  return (
    <>
      <Container
        // component="main"
        // maxWidth="xs"
        sx={{
          mb: 10,
          width: "35%",
        }}
      >
        <Box
          component={Paper}
          elevation={4}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Typography component="h1" variant="h4">
            Book Service
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
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

            <Stack direction="row">
              <Button variant="contained" onClick={handleClickOpenDialog}>
                Add Pin Location
              </Button>
              <TextField
                placeholder="Pin Location"
                fullWidth
                sx={{
                  ml: 2,
                }}
                inputProps={{ readOnly: true }}
                value={pinLocation.address}
              />
              {/* <h4>{pinLocation.coordinates.latitude},</h4>
              <h4>{pinLocation.coordinates.longitude}</h4> */}
            </Stack>

            <Dialog
              open={openDialog}
              // onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <Box sx={{ width: "100%" }}>
                <ChatGPTMap setPinLocation={setPinLocation} />
              </Box>
              {/* <ChatGPTMap /> */}
              {/* </Box> */}

              {/* <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                {/* <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText> */}
              {/* </DialogContent> */}
              {/* <h1>{pinLocation.coordinates.latitude}</h1>
              <h1>{pinLocation.coordinates.longitude}</h1>
              <h1>{pinLocation.address}</h1> */}
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    setPinLocation({ address: "" });
                    handleCloseDialog();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCloseDialog}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

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
          {/* <Box
            sx={{
              width: "100%",
              height: 600,
            }}
          >
            <ChatGPTMap apiKey={API_KEY} />
          </Box> */}
        </Box>
        {/* <GetGeoLocationWithCoordinates /> */}
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
    </>
  );
}
