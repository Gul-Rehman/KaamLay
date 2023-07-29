import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ColorConfigs from "../../Configs/ColorConfigs";
import axios from "axios";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import UserRole from "../../Components/UserRole";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import GetPinLocationMap from "../../Components/GetPinLocationMap";
const Profile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [verification, setVerification] = useState(null);
  const [showVerificationButton, setShowVerificationButton] = useState(false);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/profile/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        console.log("Profile Response" + response.data[0].user.verification);
        setName(response.data[0].user.name);

        if (response.data[0].user.verification == false) {
          setShowVerificationButton(true);
        }
        // setContactNumber(setName(response.data[0].user.contactNumber);)

        setUserId(response.data[0].user._id);
        localStorage.setItem("imageUrl", response.data[0].profilepicture);
      })
      .catch((err) => {
        console.error(err.message);
      });
    axios
      .get(
        `http://localhost:5000/user/getuser/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        setName(response.data.name);

        setUserId(response.data._id);
        if (response.data.verification == false) {
          setShowVerificationButton(true);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);

    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };
  const [image, setImage] = useState("");
  const formData = new FormData();
  // formData.append("image", image);
  const [notEditable, setNotEditable] = useState(true);

  const [contactNumber, setContactNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [pinLocation, setPinLocation] = useState({
    coordinates: {
      latitude: "",
      longitude: "",
    },
    address: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openVerificationDialog, setOpenVerificationDialog] =
    React.useState(false);

  const handleClickOpenVerificationDialog = () => {
    setOpenVerificationDialog(true);
  };

  const handleCloseVerificationDialog = () => {
    setOpenVerificationDialog(false);
    setPreviewSources([]);
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
  const [images, setImages] = useState([]);
  const sendVerificationRequest = () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    axios
      .post("http://localhost:5000/api/verificationrequests", formData, {
        headers: {
          authtoken: localStorage.getItem("token"),
        },
      })
      .then(() => {
        handleCloseVerificationDialog();
        handleClickOpenMessageDialog();
        setImages([]);
      });
  };

  const [openMessageDialog, setOpenMessageDialog] = React.useState(false);

  const handleClickOpenMessageDialog = () => {
    setOpenMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setOpenMessageDialog(false);
  };
  const [showEmptyErrorMessage, setShowEmptyErrorMessage] = useState(false);

  // const UpdateProfile = () => {
  //   const formData = new FormData();

  //   // formData.append("image", localStorage.getItem("imageUrl"));

  //   // formData.append("contactnumber", contactNumber);
  //   // formData.append("pinLocation", pinLocation);
  //   axios
  //     .post(
  //       "http://localhost:5000/api/profile",
  //       { contactnumber: contactNumber, pinLocation },
  //       {
  //         headers: {
  //           authtoken: localStorage.getItem("token"),
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          pb: 7,
          pt: 4,
          // backgroundColor: `${ColorConfigs.lightorange}`,
        }}
      >
        <Grid container spacing={0} paddingLeft={6} paddingRight={6}>
          <Grid item xs={4} tablet={5} laptops={3}>
            <Box
              sx={{
                backgroundColor: "gray",
                width: "15rem",
                height: "15rem",
                borderRadius: "10px 10px 10px 10px ",

                position: "relative",
              }}
            >
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "15rem",

                    borderRadius: "10px 10px 10px 10px",
                    objectFit: "fit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // textAlign: "center",
                  }}
                >
                  {!localStorage.getItem("imageUrl") ? (
                    <Typography variant="h4">Upload Image</Typography>
                  ) : (
                    <img
                      style={{
                        width: "100%",
                        height: "15rem",

                        borderRadius: "10px 10px 10px 10px",
                        objectFit: "fit",
                      }}
                      src={`http://localhost:5000/${localStorage.getItem(
                        "imageUrl"
                      )}`}
                    />
                  )}
                </Box>

                <EditIcon
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    alignSelf: "center",
                    width: "100%",
                    backgroundColor: `${ColorConfigs.lightorange}`,
                    borderRadius: "0 0 10px 10px",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                />
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={async (e) => {
                    formData.append("image", e.target.files[0]);

                    await axios
                      .post("http://localhost:5000/api/profile", formData, {
                        headers: {
                          authtoken: localStorage.getItem("token"),
                        },
                      })
                      .then((response) => {
                        console.log(response);

                        // localStorage.setItem(
                        //   "imageUrl",
                        //   `profile\\${response.data.user}`
                        // );
                        axios
                          .get(
                            `http://localhost:5000/api/profile/${localStorage.getItem(
                              "userId"
                            )}`
                          )
                          .then((response) => {
                            // console.log(response.data);
                            response.data.map((item) => {
                              setImageUrl(item.profilepicture);
                              localStorage.setItem(
                                "imageUrl",
                                item.profilepicture
                              );
                            });

                            console.log("url" + imageUrl);

                            // setServices(response.data);
                          })
                          .catch((err) => {
                            console.error(err.message);
                          });
                      })
                      .catch((err) => {
                        console.error(err.message);
                      });
                  }}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={8} tablet={7} laptops={8} position="relative">
            <Box
              component={Paper}
              width="100%"
              padding={4}
              sx={
                {
                  // backgroundColor: `#fb8e4f`,
                }
              }
              borderRadius={5}
              elevation={5}
            >
              <Stack direction="row" alignItems="center">
                <Typography>User ID: </Typography>{" "}
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                      }}
                    >
                      {userId}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Stack>
                <Typography>Name </Typography>{" "}
                <TextField
                  fullWidth
                  variant="outlined"
                  id="Name"
                  value={name}
                  sx={{
                    // width: 700,

                    "& .MuiInputBase-root": {
                      height: 40,
                      // width: "auto",
                    },
                  }}
                  inputProps={{ readOnly: notEditable }}
                />
              </Stack>

              {/* <Stack>
                <Typography>Contact Number </Typography>{" "}
                <TextField
                  fullWidth
                  id="contactnumber"
                  value={contactNumber}
                  onChange={(event) => {
                    setContactNumber(event.target.value);
                  }}
                  sx={{
                    width: 700,

                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                  }}
                  inputProps={{ readOnly: notEditable }}
                />
              </Stack>
              <Stack>
                {" "}
                <Typography>Location </Typography>{" "}
                <Stack direction="row">
                  <TextField
                    fullWidth
                    sx={{
                      width: 700,

                      "& .MuiInputBase-root": {
                        height: 40,
                      },
                    }}
                    inputProps={{ readOnly: true }}
                    value={pinLocation.address}
                  />
                  {!notEditable && (
                    <Button
                      variant="contained"
                      onClick={handleClickOpenDialog}
                      sx={{ ml: 2 }}
                    >
                      Add Pin Location
                    </Button>
                  )}
                </Stack>
              </Stack> */}
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

              {/* <Fab
                title="Edit"
                variant="extended"
                color="primary"
                aria-label="edit"
                sx={{ position: "absolute", right: 0, top: 25 }}
                onClick={() => {
                  if (notEditable) {
                    setNotEditable(false);
                  } else {
                    setNotEditable(true);
                  }
                }}
              >
                <EditIcon sx={{ mr: 1 }} />
                Edit
              </Fab> */}

              {/* {!notEditable && (
                <Fab
                  title="Edit"
                  variant="extended"
                  color="primary"
                  aria-label="edit"
                  sx={{ position: "absolute", right: 0, top: 25 }}
                  onClick={() => {
                    setNotEditable(true);
                    UpdateProfile();
                  }}
                >
                  <SaveIcon sx={{ mr: 1 }} />
                  Save
                </Fab>
              )} */}
            </Box>
          </Grid>
          <Grid item xs={4} tablet={5} laptops={3}>
            {showVerificationButton && (
              <Button
                variant="contained"
                onClick={handleClickOpenVerificationDialog}
                sx={{
                  marginTop: 5,
                }}
              >
                {" "}
                Get Verified
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={8}
            tablet={7}
            laptops={8}
            position="relative"
            marginTop={3}
          >
            <Box
              component={Paper}
              width="100%"
              padding={4}
              borderRadius={5}
              elevation={5}
            >
              <UserRole />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Verification Dialog */}
      {/* <Button variant="outlined" onClick={handleClickOpenVerificationDialog}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={openVerificationDialog}
        onClose={handleCloseVerificationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Get Verified"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              mb: 4,
            }}
          >
            Upload Your CNIC Front Side and Back Side Images
          </DialogContentText>

          <input
            type="file"
            onChange={(e) => {
              setImages(e.target.files);

              previewFiles(e.target.files);
              if (e.target.files.length >= 1) {
                setShowEmptyErrorMessage(false);
              }
            }}
            multiple
          />
          {showEmptyErrorMessage && (
            <Typography color={"red"}>Please Attach Images</Typography>
          )}
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
                    style={{ width: "400px", height: "200px" }}
                  />
                </Box>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVerificationDialog}>Cancel</Button>
          <Button
            onClick={() => {
              if (previewSources.length <= 0) {
                setShowEmptyErrorMessage(true);
              } else {
                setShowEmptyErrorMessage(false);
                sendVerificationRequest();
              }
            }}
            autoFocus
          >
            Get Verified
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Button variant="outlined" onClick={handleClickOpenMessageDialog}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={openMessageDialog}
        onClose={handleCloseMessageDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Verification Request Sent"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Verification Request Has Been Sent , You Will Be Allowed To
            Work As A Service Provider Once You Will Be Verified
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
