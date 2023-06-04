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

const CustomizedBox = styled(Box)({
  //   marginLeft: "20px",
  //   marginRight: "20px",
  marginTop: "10px",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostService() {
  const [previewSource, setPreviewSource] = useState("");
  const [previewSources, setPreviewSources] = useState([]);
  const navigate = useNavigate();
  const theme = createTheme();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  // console.log(image, 12);

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
    "Others",
  ];

  const [serviceType, setServiceType] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [contactnumber, setContactNumber] = useState("");

  // const data = {
  //   servicetitle: serviceTitle,
  //   servicecategory: serviceType,
  //   servicedescription: serviceDescription,
  //   contactnumber: contactnumber,
  //   price: servicePrice,
  // };
  const onsubmit = () => {
    const formData = new FormData();
    formData.append("servicetitle", serviceTitle);
    formData.append("servicecategory", serviceType);
    formData.append("servicedescription", serviceDescription);
    formData.append("contactnumber", contactnumber);
    formData.append("price", servicePrice);
    formData.append("image", image);
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
    // console.log(data);
    // showSuccess();
    // setTimeout(() => {
    //   navigate("/");
    // }, 2000);
  };
  //   For Single File

  //   const previewFile = (file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setPreviewSource(reader.result);
  //     };
  //   };

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
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [address, setAddress] = useState("");

  const [serviceproviderId, setServiceProviderId] = useState("");
  const [pinLocation, setPinLocation] = useState({
    coordinates: {
      latitude: "",
      longitude: "",
    },
    address: "",
  });
  return (
    <>
      <Container
        // component="main"
        // maxWidth="xs"
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
              //   component={"input"}
              onChange={(e) => {
                setImage(e.target.files[0]);
                // previewFile(e.target.files[0]);
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
              sx={{ mt: 3, mb: 2, backgroundColor: `${ColorConfigs.primary}` }}
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
