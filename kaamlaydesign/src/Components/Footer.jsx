import React from "react";
import { Box, width } from "@mui/system";
import { Link, Stack, Typography } from "@mui/material";
// import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
// import Footerbackground from '../Assets/footerbg.svg';
// import Footerbackground2 from '../Assets/footerbg2.svg';
import Footerbackground from "../Assets/footerbglarge.svg";
import facebook from "../Assets/facebook.png";
import instagram from "../Assets/instagram.png";
import gmail from "../Assets/mail.png";
import desktoplogo from "../Assets/Kaamlaydesktop.png";
import { createTheme, ThemeProvider } from "@mui/material/";
import { NavLink } from "react-router-dom";

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

const Footer = () => {
  const CustomizedLink = styled(Link)({
    textDecoration: "none",
    marginBottom: "10px",
    color: "black",
    cursor: "pointer",
    fontFamily: "Roboto",
    fontSize: "20px",
    "&:hover": {
      color: "white",
    },
  });

  const Image = styled("img")({
    width: "70px",
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: "-40px",
          }}
        >
          <Box
            sx={
              {
                // height:"30vh"
              }
            }
          ></Box>

          <Box
            sx={{
              // backgroundImage:`url(${Footerbackground})`,
              // backgroundImage:`url(${Footerbackground2})`,
              backgroundImage: `url(${Footerbackground})`,
              width: "100%",
              height: "15vh",
              // height:"40vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover ",
              backgroundPosition: "center center",

              // mt:"50px",
              // mb:"50px"
              // backgroundSize:"!00% 100%",
              // backgroundAttachment:"fixed"
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: "#fabb8b",
              height: { laptops: "50vh", tablet: "60vh", xs: "250vh" },
              width: "100%",
              // bottom:0
            }}
          >
            <Stack
              direction={{ tablet: "row", xs: "column" }}
              justifyContent="space-between"
              margin={{
                laptopl: "0px 100px",
                laptops: "0px 70px",
                tablet: "0px 30px",
                mobilel: "0px 30px",
              }}
              sx={{ padding: "10px" }}
            >
              <Stack>
                <Stack
                  sx={{
                    display: {
                      xs: "none",
                      laptopl: "flex",
                    },
                  }}
                >
                  <img
                    src={desktoplogo}
                    alt="KaamLay Logo"
                    style={{
                      width: "300px",
                      // width:{laptops:"400px",tablet:"100px"}
                    }}
                  />
                </Stack>
                <Stack
                  sx={{
                    display: {
                      xs: "none",
                      laptops: "flex",
                      laptopl: "none",
                    },
                  }}
                >
                  <img
                    src={desktoplogo}
                    alt="KaamLay Logo"
                    style={{
                      width: "200px",
                      // width:{laptops:"400px",tablet:"100px"}
                    }}
                  />
                </Stack>

                <Stack
                  sx={{
                    display: {
                      mobilel: "none",
                      tablet: "flex",
                      laptops: "none",
                    },
                  }}
                >
                  <img
                    src={desktoplogo}
                    alt="KaamLay Logo"
                    style={{
                      width: "150px",
                      // width:{laptops:"400px",tablet:"100px"}
                    }}
                  />
                </Stack>
                <Stack
                  sx={{
                    display: {
                      xs: "none",
                      mobiles: "none",
                      mobilem: "none",
                      mobilel: "flex",
                      tablet: "none",
                      laptops: "none",
                    },
                  }}
                >
                  <img
                    src={desktoplogo}
                    alt="KaamLay Logo"
                    style={{
                      width: "150px",
                      // width:{laptops:"400px",tablet:"100px"}
                    }}
                  />
                </Stack>
                {/* <Stack sx={{
              display:{
                xs:"none",
                mobiles:"none",
                mobilem:"none",
                mobilel:"flex",
                tablet:"none",
                laptops:"none"
            }
            }}>
            <img src={desktoplogo} alt="KaamLay Logo" style={{
              width:"100px"
              // width:{laptops:"400px",tablet:"100px"}
            }}/>
            </Stack> */}

                <Typography> Kaam Lay Is a Service Based Platform</Typography>
              </Stack>
              <Stack sx={{}}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: "30px",
                    // backgroundColor:""
                  }}
                >
                  Pages
                </Typography>
                <Stack sx={{}}>
                  <CustomizedLink component={NavLink} to="/">
                    Home
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/about">
                    About
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/services">
                    Service
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/contactus">
                    Contact Us
                  </CustomizedLink>
                </Stack>
              </Stack>

              <Stack
                sx={
                  {
                    // justifyContent:"flex-start"
                  }
                }
              >
                <Typography variant="h5" sx={{ mb: "30px" }}>
                  Service Categories
                </Typography>
                <Stack>
                  <CustomizedLink component={NavLink} to="/plumbingservices">
                    Plumbing
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/electricianservices">
                    Electrician
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/painterservices">
                    Painter
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/carpenterservices">
                    Carpenter
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/carwashservices">
                    Car Wash
                  </CustomizedLink>
                  <CustomizedLink
                    component={NavLink}
                    to="/sofacleaningservices"
                  >
                    Sofa Cleaning
                  </CustomizedLink>
                  <CustomizedLink
                    component={NavLink}
                    to="/homeappliancesservices"
                  >
                    Home Appliances
                  </CustomizedLink>
                  <CustomizedLink component={NavLink} to="/acservices">
                    AC Services
                  </CustomizedLink>
                </Stack>
              </Stack>

              <Stack>
                <Stack
                  direction="row"
                  spacing={{ laptops: "20px", tablet: "10px", mobilel: "10px" }}
                  sx={{}}
                >
                  <Image
                    sx={{
                      width: {
                        laptopl: "60px",
                        laptops: "50px",
                        tablet: "40px",
                      },
                    }}
                    src={facebook}
                    alt="Facebook Icon"
                  />
                  <Image
                    sx={{
                      width: {
                        laptopl: "60px",
                        laptops: "50px",
                        tablet: "40px",
                      },
                    }}
                    src={instagram}
                    alt="Instagram Icon"
                  />
                  <Image
                    sx={{
                      width: {
                        laptopl: "60px",
                        laptops: "50px",
                        tablet: "40px",
                      },
                    }}
                    src={gmail}
                    alt="Gmail Icon"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Footer;