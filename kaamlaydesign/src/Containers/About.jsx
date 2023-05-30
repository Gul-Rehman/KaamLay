import React from "react";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";
// import {Grid} from '@mui/material'
import { styled } from "@mui/material";
import desktoplogo from "../Assets/Kaamlaydesktop.png";
import gulpic from "../Assets/gulpic.jpeg";
import avatar from "../Assets/avatar.webp";
import { width } from "@mui/system";
import { useContext } from "react";
import { Button } from "@mui/material";

import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/";
import LoginContext from "../Contexts/LoginContext";
const Image = styled("img")({});

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobiles: 320,
      mobilem: 375,
      mobilel: 425,
      tablet: 768,
      laptops: 1024,
      laptopl: 1440,
    },
  },
});

const About = () => {
  const a = useContext(LoginContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: { tablet: "1500px", xs: "2000px" },
            width: "100%",
            backgroundColor: "#fabb8b",
          }}
        >
          {/* <Typography>{a.username}</Typography> */}
          {/* <Button
            onClick={() => {
              a.setUserName("Just UserName");
            }}
          >
            Set Name
          </Button> */}
          <Stack>
            <Stack marginTop="50px">
              <Image
                src={desktoplogo}
                alt="Logo"
                sx={{
                  width: { mobilel: "400px", mobilem: "300px", xs: "250px" },
                  alignSelf: "center",
                }}
              />
            </Stack>

            <Stack>
              <Box margin={5} width={{}} alignSelf="center">
                <Typography
                  fontFamily="sans-serif"
                  fontSize={{ laptops: "20px", tablet: "15px" }}
                  fontWeight="bold"
                  align="justify"
                >
                  Kaam Lay is a web application which covers the website in two
                  parts. One for the service users and second for the service
                  providers. It will provide the platform to all service users
                  to hire the handyman or technical expert (Plumber, Mechanic,
                  Auto-mechanic, Cleaners, Movers etc.) at home. After
                  completion of hired service, the application generates the
                  total bill to pay the charges and ask for the rating or
                  feedback about recent service. And service providers can post
                  their services from which users will select the service they
                  want.
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction={{ tablet: "row", xs: "column" }}
              justifyContent="space-between"
              margin="20px  30px"
            >
              <Stack>
                <Typography
                  color="white"
                  alignSelf="center"
                  marginBottom={2}
                  // fontFamily="Roboto"
                  fontSize={26}
                  sx={{
                    backgroundColor: "#fa541c",
                    width: "200px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                >
                  Student
                </Typography>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    // height="440"

                    image={gulpic}
                    alt="Gul Picture"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Gul Rehman
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gul Rehman From BS(CS) 8-B (Evening)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Arid Number: 19-Arid-897
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email:{" "}
                      <a href="mailto:soomrogulrehman@gmail.com">
                        soomrogulrehman@gmail.com
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>

              <Stack marginTop={{ xs: "50px", tablet: "0px" }}>
                <Typography
                  color="white"
                  alignSelf="center"
                  marginBottom={2}
                  fontFamily="Roboto"
                  fontSize={26}
                  sx={{
                    backgroundColor: "#fa541c",
                    width: "200px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                >
                  Supervisor
                </Typography>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    // height="440"

                    image={avatar}
                    alt="Sir Ahsan Arshad Picture"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Mr. Muhammad Ahsan Arshad
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lecturer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email:{" "}
                      <a href="mailto:ahsan.arshad@uaar.edu.pk">
                        ahsan.arshad@uaar.edu.pk
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default About;
