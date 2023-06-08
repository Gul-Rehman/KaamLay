import React, { useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ColorConfigs from "../../Configs/ColorConfigs";
import { Dialog, DialogActions, FormControl, Paper } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import ChatGPTMap from "../ChatGPTMap";
import { Stack } from "@mui/system";

const CustomizedBox = styled(Box)({
  marginTop: "10px",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostService() {
  const [previewSource, setPreviewSource] = useState("");
  const [previewSources, setPreviewSources] = useState([]);
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

  const servicetypesValues = [
    "Plumbing",
    "Car Wash",
    "Painter",
    "Electrician",
    "Sofa Cleaning",
    "Home Appliances",
    "AC Services",
    "Carpenter",
    "Others",
  ];

  const [serviceType, setServiceType] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const [contactnumber, setContactNumber] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log(pinLocation);
    setOpenDialog(false);
  };
  const [address, setAddress] = useState("");

  const [pinLocation, setPinLocation] = useState({
    coordinates: {
      latitude: "",
      longitude: "",
    },
    address: "",
  });

  const [images, setImages] = useState([]);
  const onsubmit = () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    formData.append("servicetitle", serviceTitle);
    formData.append("contactnumber", contactnumber);
    formData.append("servicedescription", serviceDescription);
    formData.append("servicecategory", serviceType);
    formData.append("address", address);
    formData.append("pinLocation", JSON.stringify(pinLocation));

    axios
      .post("http://localhost:5000/api/service/requestservice", formData, {
        headers: {
          authtoken: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        showSuccess();
        setTimeout(() => {
          navigate("/clientdashboard");
        }, 2000);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  // For Multiple Files

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
        sx={{
          mb: 10,
          width: { xs: "60%", tablet: "60%", laptops: "40%" },
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
          <Typography component="h1" variant="h5">
            Request Service
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
              required
              id="servicetitle"
              label=" Service Title"
              name="servicetitle"
              autoComplete="servicetitle"
              autoFocus
              value={serviceTitle}
              onChange={(event) => {
                setServiceTitle(event.target.value);
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
            <TextField
              margin="normal"
              multiline
              rows={4}
              fullWidth
              required
              label=" Service Description"
              id="servicedescription"
              placeholder="Describe What You Want"
              name="servicedescription"
              autoComplete="servicedescription"
              value={serviceDescription}
              onChange={(event) => {
                setServiceDescription(event.target.value);
              }}
            />
            <Typography color="primary">
              {" "}
              Attach Images For Better Understanding
            </Typography>
            <input
              type="file"
              onChange={(e) => {
                setImages(e.target.files);

                previewFiles(e.target.files);
              }}
              multiple
            />
            {previewSources.length > 0 && (
              <div>
                {previewSources.map((previewSource, index) => (
                  <Box
                    sx={{
                      display: "inline-block",
                      border: "1px solid black",
                      ml: 1,
                    }}
                  >
                    <img
                      key={index}
                      src={previewSource}
                      alt={`Preview ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Box>
                ))}
              </div>
            )}
            {previewSource && (
              <img
                src={previewSource}
                alt="Preview"
                style={{ width: "200px" }}
              />
            )}

            <CustomizedBox sx={{}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Service Type
                </InputLabel>
                <Select
                  id="servicetype"
                  value={serviceType}
                  label="Service Type"
                  onChange={(event) => {
                    setServiceType(event.target.value);
                  }}
                >
                  {servicetypesValues.map((item) => {
                    return (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </CustomizedBox>
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
            </Stack>

            <Dialog
              open={openDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <Box sx={{ width: "100%" }}>
                <ChatGPTMap setPinLocation={setPinLocation} />
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

            <Button
              //   type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: `${ColorConfigs.primary}`,
              }}
              onClick={onsubmit}
            >
              Request Service
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
          Service Requested Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
