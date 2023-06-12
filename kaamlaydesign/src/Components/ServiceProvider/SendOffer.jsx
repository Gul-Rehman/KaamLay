import React, { useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ColorConfigs from "../../Configs/ColorConfigs";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SendOffer() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [images, setImages] = useState([]);

  const showSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [serviceProposal, setServiceProposal] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    console.log("files length" + images.length);

    e.preventDefault();

    const newErrors = {};

    if (!serviceProposal) {
      newErrors.serviceProposal = "Service Proposal is required";
    }

    if (!contactnumber) {
      newErrors.contactnumber = "Contact Number is required";
    } else if (
      !/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/.test(contactnumber)
    ) {
      newErrors.contactnumber = "Invalid Contact Number";
    }

    if (!serviceDuration) {
      newErrors.serviceDuration = "Service Duration is required";
    }

    if (!servicePrice) {
      newErrors.servicePrice = "Service Charges are required";
    } else if (!/^\d+$/.test(servicePrice)) {
      newErrors.servicePrice = "Invalid Service Charges";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }
      //   formData.append("servicetitle", serviceTitle);
      //   formData.append("servicecategory", serviceType);
      //   formData.append("servicedescription", serviceDescription);
      //   formData.append("contactnumber", contactnumber);
      //   formData.append("price", servicePrice);

      axios
        .post("http://localhost:5000/api/service", formData, {
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
  const [previewSources, setPreviewSources] = useState([]);
  const previewFiles = (files) => {
    const fileArray = Array.from(files);
    Promise.all(
      fileArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
        });
      })
    )
      .then((results) => {
        setPreviewSources(results);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          mb: 10,
          backgroundImage: "",
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
            Send Offer
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
              error={!!errors.servicePrice}
              helperText={errors.servicePrice}
              id="serviceprice"
              label=" Price"
              name="serviceprice"
              autoComplete="serviceprice"
              value={servicePrice}
              onChange={(event) => {
                setServicePrice(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              multiline
              rows={4}
              fullWidth
              error={!!errors.serviceProposal}
              helperText={errors.serviceProposal}
              label=" Service Proposal"
              id="serviceproposal"
              name="serviceproposal"
              autoComplete="serviceproposal"
              InputProps={{
                inputProps: {
                  maxLength: 170,
                },

                endAdornment: (
                  <span>
                    {serviceProposal.length}/{170}
                  </span>
                ),
              }}
              value={serviceProposal}
              onChange={(event) => {
                setServiceProposal(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
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
            <TextField
              margin="normal"
              fullWidth
              error={!!errors.serviceDuration}
              helperText={errors.serviceDuration}
              id="serviceduration"
              label="Service Duration In Days"
              name="serviceduration"
              autoComplete="serviceduration"
              value={serviceDuration}
              onChange={(event) => {
                setServiceDuration(event.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: `${ColorConfigs.primary}` }}
              type="submit"
            >
              Send Offer
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
          Offer Sent Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
