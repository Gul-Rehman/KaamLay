import React from "react";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import PageNotFoundIllustration from "../Assets/pagenotfoundillustration.svg";
import Kaamlaydesktop from "../Assets/Kaamlaydesktop.png";
import ColorConfigs from "../Configs/ColorConfigs";
const PageNotFound = () => {
  return (
    <>
      <Box
        margin={0}
        width="100%"
        height="95vh"
        sx={{ backgroundColor: `${ColorConfigs.lightorange}` }}
        paddingTop={10}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            component={"img"}
            src={Kaamlaydesktop}
            alt={"Illustration"}
            width={400}
          />
          <Stack direction={"column"} sx={{ marginTop: 5 }}>
            <Typography fontSize={60} color={"primary"}>
              404!
            </Typography>
            <Typography
              fontSize={60}
              fontFamily={"DenseLetters"}
              color={"primary"}
            >
              Page Not Found
            </Typography>
          </Stack>
          <Box
            component={"img"}
            src={PageNotFoundIllustration}
            alt={"Illustration"}
            width={400}
          />
        </Box>
      </Box>
    </>
  );
};

export default PageNotFound;
