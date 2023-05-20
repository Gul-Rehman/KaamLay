import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ColorConfigs from "../../Configs/ColorConfigs";
import axios from "axios";

import Grid from "@mui/material/Grid";
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

  return (
    <>
      <Stack
        // justifyContent="center"
        // alignItems="center"
        // alignContent="center"
        sx={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // translate: "-50px -50px",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", pb: 7, pt: 4 }}>
          {/* <Button
          onClick={async () => {
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
        >
          {" "}
          Upload
        </Button>
        Profile */}

          <Grid container spacing={2}>
            <Grid item xs={4} tablet={5} laptops={4}>
              {/* <Item>xs=8</Item> */}
              <Box
                sx={{
                  backgroundColor: "gray",
                  width: "15rem",
                  height: "15rem",
                  borderRadius: "10px 10px 10px 10px ",
                  ml: 3,

                  position: "relative",
                }}
              >
                {/* <Box
            sx={{
              position: "absolute",
              bottom: 0,

              backgroundColor: "yellow",
              display: "flex",
              width: "100%",
            }}
          >
            <EditIcon
              sx={{
                backgroundColor: "gray",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            />
          </Box> */}

                <Stack
                  sx={{
                    alignItems: "center",
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
                    //   onChange={handleFileChange}
                    onChange={async (e) => {
                      // setImage(e.target.files[0]);
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
            <Grid item xs={8} tablet={7} laptops={8}>
              {/* <Item>xs=4</Item> */}
              <Box
                component={Paper}
                width="100%"
                sx={{ ml: { tablet: -5, laptops: -7 } }}
              >
                Hello
              </Box>
            </Grid>
          </Grid>
          <Typography> Hello</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
