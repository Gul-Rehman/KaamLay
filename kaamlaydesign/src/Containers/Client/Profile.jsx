import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Fab, Paper, Stack, Typography } from "@mui/material";

import ColorConfigs from "../../Configs/ColorConfigs";
import axios from "axios";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import UserRole from "../../Components/UserRole";
const Profile = () => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/profile/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        // console.log(response.data);
        response.data.map((item) => {
          setImageUrl(item.profilepicture);
          localStorage.setItem("imageUrl", item.profilepicture);
        });

        console.log("url" + imageUrl);

        // setServices(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);

    // 👇️ reset file input
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
                <img
                  style={{
                    width: "100%",
                    height: "15rem",

                    borderRadius: "10px 10px 10px 10px",
                    objectFit: "fit",
                  }}
                  src={`http://localhost:5000/${imageUrl}`}
                />

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
              <Stack>
                <Typography>Name </Typography>{" "}
                <TextField
                  fullWidth
                  variant="outlined"
                  id="Name"
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
                <Typography>User ID </Typography>{" "}
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
                        fontSize: 25,
                      }}
                    >
                      123456789
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Stack>
                <Typography>Contact Number </Typography>{" "}
                <TextField
                  fullWidth
                  id="contactnumber"
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
                <Typography>CNIC </Typography>{" "}
                <Typography
                  sx={{
                    fontSize: 25,
                  }}
                >
                  123456789
                </Typography>
              </Stack>
              <Stack>
                <Typography>Location </Typography>{" "}
                <TextField
                  sx={{
                    width: 700,

                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                  }}
                  inputProps={{ readOnly: notEditable }}
                />
              </Stack>
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
