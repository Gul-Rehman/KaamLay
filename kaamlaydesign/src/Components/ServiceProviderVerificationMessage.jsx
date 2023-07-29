import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import ColorConfigs from "../Configs/ColorConfigs";
import PageNotFoundIllustration from "../Assets/pagenotfoundillustration.svg";
import Kaamlaydesktop from "../Assets/Kaamlaydesktop.png";

const ServiceProviderVerificationMessage = () => {
  return (
    <>
      <Box
        margin={0}
        width="100%"
        height="95vh"
        sx={{ backgroundColor: `${ColorConfigs.lightorange}` }}
        paddingTop={10}
        display={"flex"}
        flexDirection={"column"}
        // justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          //   justifyContent={"center"}
          alignItems={"center"}
          width={"50%"}
        >
          <Box
            component={"img"}
            src={Kaamlaydesktop}
            alt={"Illustration"}
            width={400}
          />
          <Stack direction={"column"} sx={{ marginTop: 7 }}>
            <Typography
              fontSize={60}
              fontFamily={"DenseLetters"}
              color={"primary"}
              textAlign={"center"}
            >
              Get Verified
            </Typography>
            <Typography
              fontSize={50}
              //   color={"primary"}
              textAlign={"justify"}
              marginTop={4}
            >
              In Order To Work As A Service Provider You Have To Get Verified{" "}
            </Typography>
          </Stack>
          {/* <Box
            component={"img"}
            src={PageNotFoundIllustration}
            alt={"Illustration"}
            width={400}
          /> */}
        </Box>
      </Box>
    </>
  );
};

export default ServiceProviderVerificationMessage;
