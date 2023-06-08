import React from "react";
import { Box, Stack } from "@mui/system";
import { Button, Paper, TextField, Typography } from "@mui/material";
import ColorConfigs from "../Configs/ColorConfigs";
import { styled } from "@mui/system";
import ContactUsIllustration from "../Assets/contactusillustration.svg";

const CustomizedTextField = styled(TextField)({
  marginTop: 20,
});
const ContactUs = () => {
  return (
    <>
      {/* <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          // backgroundColor: `${ColorConfigs.primary}`,
          // alignItems: "center",
          mb: -40,
        }}
      >
        <Box display="block">
          <Typography
            sx={{
              fontSize: "50px",
              fontFamily: "Cabin Condensed",
              mt: 10,
            }}
          >
            If You Have Any Queries Please Send Us An Email
          </Typography>
          <Typography
            sx={{
              fontSize: "50px",
              fontFamily: "Cabin Condensed",
              mt: 10,
              textAlign: "center",
            }}
          >
            project.kaamlay@gmail.com
          </Typography>
        </Box>
      </Box> */}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          // backgroundColor: `${ColorConfigs.lightorange}`,
          paddingBottom: "-20px",
        }}
      >
        <Box
          component={"img"}
          src={ContactUsIllustration}
          alt="Illustration"
          sx={{ width: 600, mr: 10 }}
        />
        <Box
          component={Paper}
          elevation={5}
          sx={{
            // pl: 6,
            // pr: 6,
            p: 6,
            mt: 6,
            mb: 9,
            borderRadius: 4,
          }}
        >
          <Stack
            sx={{
              width: 500,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              fontSize={30}
              fontFamily={"sans-serif"}
              fontWeight={600}
            >
              Send Us Your Queries
            </Typography>
            <CustomizedTextField label="Name" variant="outlined" fullWidth />

            <CustomizedTextField label="Email" variant="outlined" fullWidth />
            <CustomizedTextField
              label="Contact Number"
              variant="outlined"
              fullWidth
            />
            <CustomizedTextField
              label="Message"
              multiline
              rows={10}
              variant="outlined"
              fullWidth
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              width: "30%",
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;
