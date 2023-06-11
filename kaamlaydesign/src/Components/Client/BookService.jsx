import React, { useState } from "react";

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

import GetPinLocationMap from "../GetPinLocationMap";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BookService() {
  const [errors, setErrors] = useState({});
  // const handleRefresh = () => {
  //   window.location.reload(); // Reload the entire web app
  // };

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

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");
  const [contactnumber, setContactNumber] = useState("");

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
    serviceId: localStorage.getItem("serviceId"),
    serviceproviderId: localStorage.getItem("serviceproviderId"),
    pinLocation,
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {
      newErrors.name = "Invalid Name ";
    }

    if (!address) {
      newErrors.address = "Address is required";
    }

    if (!pinLocation.address) {
      newErrors.pinLocation = "PinLocation is required";
    }

    if (!contactnumber) {
      newErrors.contactnumber = "Contact Number is required";
    } else if (
      !/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/.test(contactnumber)
    ) {
      newErrors.contactnumber = "Invalid Contact Number";
    }

    // if (!email) {
    //   newErrors.email = "Email is required";
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   newErrors.email = "Invalid email address";
    // }

    // if (!password) {
    //   newErrors.password = "Password is required";
    // } else if (password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters long";
    // }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

          <Box
            component="form"
            onSubmit={handleSubmit}
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
              error={!!errors.name}
              helperText={errors.name}
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              InputProps={{
                inputProps: {
                  maxLength: 30,
                },

                endAdornment: (
                  <span>
                    {name.length}/{30}
                  </span>
                ),
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
              InputProps={{
                inputProps: {
                  maxLength: 150,
                },

                endAdornment: (
                  <span>
                    {address.length}/{150}
                  </span>
                ),
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
                error={!!errors.pinLocation}
                helperText={errors.pinLocation}
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
                <GetPinLocationMap setPinLocation={setPinLocation} />
              </Box>

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
              error={!!errors.contactnumber}
              helperText={errors.contactnumber}
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
              type="submit"
              // onClick={onsubmit}
            >
              Book Service
            </Button>
          </Box>
        </Box>
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
