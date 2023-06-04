import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Fab, Paper, Stack, Typography } from "@mui/material";

import ColorConfigs from "../../Configs/ColorConfigs";
import axios from "axios";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import UserRole from "../../Components/UserRole";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import ChatGPTMap from "../../Components/ChatGPTMap";
const Profile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/profile/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        console.log(response.data);
        setName(response.data[0].user.name);
        // setContactNumber(setName(response.data[0].user.contactNumber);)
        setUserId(response.data[0].user._id);
        localStorage.setItem("imageUrl", response.data[0].profilepicture);
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
                    width: 700,

                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                  }}
                  inputProps={{ readOnly: notEditable }}
                />
              </Stack>

              <Stack>
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
              </Stack>
              <Dialog
                open={openDialog}
                // onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
              >
                {/* <GeoLocation
                setLatitude2={setLatitude}
                setLongitude2={setLongitude}
                setPinLocation={setPinLocation}
              /> */}
                {/* <Box
                sx={{
                  marginTop: 10,
                }}
              > */}
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

              <Fab
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
              </Fab>

              {!notEditable && (
                <Fab
                  title="Edit"
                  variant="extended"
                  color="primary"
                  aria-label="edit"
                  sx={{ position: "absolute", right: 0, top: 25 }}
                  onClick={() => {
                    setNotEditable(true);
                  }}
                >
                  <SaveIcon sx={{ mr: 1 }} />
                  Save
                </Fab>
              )}
            </Box>
          </Grid>
          <Grid item laptops={3}></Grid>
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
              sx={
                {
                  // backgroundColor: `#fb8e4f`,
                }
              }
              borderRadius={5}
              elevation={5}
            >
              <UserRole />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
