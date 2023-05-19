import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ColorConfigs from "../../Configs/ColorConfigs";
import axios from "axios";
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
  formData.append("image", image);

  return (
    <>
      <Box sx={{ width: "100%", pb: 7 }}>
        <Box
          sx={{
            backgroundColor: "gray",
            width: "15rem",
            height: "15rem",
            borderRadius: 10,
            ml: 3,
            mt: 3,
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
              borderRadius: 4,
            }}
          >
            {/* <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${imageUrl}`}
            /> */}

            <EditIcon
              sx={{
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
                width: "100%",
                backgroundColor: `${ColorConfigs.lightorange}`,
              }}
              onClick={handleClick}
            />
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              //   onChange={handleFileChange}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </Stack>
        </Box>
        <Button
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
        Profile
      </Box>
    </>
  );
};

export default Profile;
