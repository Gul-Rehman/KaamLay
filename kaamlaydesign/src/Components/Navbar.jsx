import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import mobilelogo from "../Assets/Kaamlaymobile.png";
import desktoplogo from "../Assets/Kaamlaydesktop.png";
import { Link, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import DrawerComponent from "./DrawerComponent";

import "../App.css";
import "./Navbar.css";
import "@fontsource/roboto/700.css";

import { NavLink, useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";
import { createTheme, ThemeProvider } from "@mui/material/";
import axios from "axios";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      md: 1040,
    },
  },
});

const CustomizedLink = styled(Link)({
  color: "black",
  borderRadius: "20px",
  fontSize: "17px",
  textDecoration: "none",
  padding: "5px",
  width: "150px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  border: "1px ",
  fontWeight: "500",
  alignItems: "center",
  transition: "0.5s",

  "&:hover": {
    backgroundColor: "#fa541c",
    // boxShadow:"2px 2px 2px  #999999",

    color: "white",
  },
  "&:focus": {
    backgroundColor: "#fa541c",
    color: "white",
  },
});

const Navbar = () => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [client, setClient] = useState(false);
  const [serviceprovider, setServiceProvider] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/userstatus/${localStorage.getItem("userId")}`
      )
      .then((response) => {
        setUserRole(response.data.status);
        if (response.data.status == "client") {
          setClient(true);
        }
        if (response.data.status == "serviceprovider") {
          setServiceProvider(true);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const openlogin = () => {
    navigate("/login");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {auth ? (
          localStorage.getItem("userrole") == "client" ? (
            <AppBar
              position="sticky"
              sx={{
                backgroundColor: "whitesmoke",
              }}
            >
              <Toolbar
                sx={{
                  padding: "5px",
                }}
              >
                <Fade in={true} timeout={{ enter: 2000 }}>
                  <Link
                    component={NavLink}
                    to="/"
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  >
                    <img
                      src={desktoplogo}
                      alt="KaamLay Logo"
                      style={{
                        width: "200px",
                        boxShadow: "inherit",
                      }}
                    />
                  </Link>
                </Fade>
                <Fade in={true} timeout={{ enter: 2000 }}>
                  <Link
                    component={NavLink}
                    to="/"
                    sx={{
                      display: {
                        xs: "block",
                        md: "none",
                      },
                    }}
                  >
                    <img
                      src={mobilelogo}
                      alt="KaamLay Logo"
                      className="scale-up-center"
                      style={{ width: "50px" }}
                    />
                  </Link>
                </Fade>
                <Fade in={true} timeout={{ enter: 2000 }}>
                  <Stack
                    className="stack"
                    direction="row"
                    spacing={1}
                    position="absolute"
                    right={1}
                    sx={{
                      mr: "15px",
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                    }}
                  >
                    <CustomizedLink
                      className="scale-up-center"
                      component={NavLink}
                      to="/clientdashboard"
                    >
                      Dashboard
                    </CustomizedLink>
                    <CustomizedLink
                      component={NavLink}
                      to="/browsecategories"
                      className="scale-up-center"
                      sx={{ width: 150 }}
                    >
                      Browse Services
                    </CustomizedLink>
                    <CustomizedLink
                      component={NavLink}
                      to="/clientbookedservices"
                      className="scale-up-center"
                    >
                      {" "}
                      Booked Services{" "}
                    </CustomizedLink>

                    <CustomizedLink
                      component={NavLink}
                      to="/clientcompletedservices"
                      className="scale-up-center"
                      sx={{ width: 170 }}
                    >
                      Completed Services
                    </CustomizedLink>

                    <CustomizedLink
                      component={NavLink}
                      to="/contactus"
                      className="scale-up-center"
                    >
                      Contact Us
                    </CustomizedLink>
                    <Box>
                      <Button
                        variant="contained"
                        style={{ margin: "0px auto", display: "block" }}
                        onClick={logout}
                        sx={{
                          fontSize: "15px",
                          fontWeight: "1px",
                          color: "black",

                          textAlign: "center",
                          textDecoration: "none",
                          width: "150px",
                          postition: "absolute",
                          right: "1px",
                          backgroundColor: "#fa541c",

                          "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                          },
                        }}
                      >
                        Logout
                      </Button>
                    </Box>
                  </Stack>
                </Fade>

                {/* <MenuIcon sx={{ 
          display: { xs: "inline-flex", md: "none" },
           position: 'absolute',
            right: "10px",
             fontSize: "50px",
              color: "#fa541c" }} /> */}
                {/* <Drawer/> */}
                <Box
                  sx={{
                    display: { xs: "inline-flex", md: "none" },
                    position: "absolute",
                    right: "10px",
                    color: "#fa541c",
                  }}
                >
                  <DrawerComponent />
                </Box>
              </Toolbar>
            </AppBar>
          ) : (
            <AppBar
              position="sticky"
              sx={{
                backgroundColor: "whitesmoke",
              }}
            >
              <Toolbar
                sx={{
                  padding: "5px",
                }}
              >
                <Fade in={true} timeout={{ enter: 2000 }}>
                  <Link
                    component={NavLink}
                    to="/"
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  >
                    <img
                      src={desktoplogo}
                      alt="KaamLay Logo"
                      style={{
                        width: "200px",
                        boxShadow: "inherit",
                      }}
                    />
                  </Link>
                </Fade>
                <Fade in={true} timeout={{ enter: 2000 }}>
                  <Link
                    component={NavLink}
                    to="/"
                    sx={{
                      display: {
                        xs: "block",
                        md: "none",
                      },
                    }}
                  >
                    <img
                      src={mobilelogo}
                      alt="KaamLay Logo"
                      className="scale-up-center"
                      style={{ width: "50px" }}
                    />
                  </Link>
                </Fade>
                <Fade in={true} timeout={{ enter: 2000 }}>
                  <Stack
                    className="stack"
                    direction="row"
                    spacing={1}
                    position="absolute"
                    right={1}
                    sx={{
                      mr: "15px",
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                    }}
                  >
                    <CustomizedLink
                      className="scale-up-center"
                      component={NavLink}
                      to="/serviceproviderdashboard"
                    >
                      Dashboard
                    </CustomizedLink>
                    <CustomizedLink
                      component={NavLink}
                      to="/serviceproviderpostedservices"
                      className="scale-up-center"
                    >
                      {" "}
                      Posted Services{" "}
                    </CustomizedLink>

                    <CustomizedLink
                      sx={{
                        width: "170px",
                      }}
                      component={NavLink}
                      to="/completedservices"
                      className="scale-up-center"
                    >
                      Completed Services
                    </CustomizedLink>

                    <CustomizedLink
                      component={NavLink}
                      to="/contactus"
                      className="scale-up-center"
                    >
                      Contact Us
                    </CustomizedLink>
                    <Box>
                      <Button
                        variant="contained"
                        style={{ margin: "0px auto", display: "block" }}
                        onClick={logout}
                        sx={{
                          fontSize: "15px",
                          fontWeight: "1px",
                          color: "black",

                          textAlign: "center",
                          textDecoration: "none",
                          width: "150px",
                          postition: "absolute",
                          right: "1px",
                          backgroundColor: "#fa541c",

                          "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                          },
                        }}
                      >
                        Logout
                      </Button>
                    </Box>
                  </Stack>
                </Fade>

                {/* <MenuIcon sx={{ 
          display: { xs: "inline-flex", md: "none" },
           position: 'absolute',
            right: "10px",
             fontSize: "50px",
              color: "#fa541c" }} /> */}
                {/* <Drawer/> */}
                <Box
                  sx={{
                    display: { xs: "inline-flex", md: "none" },
                    position: "absolute",
                    right: "10px",
                    color: "#fa541c",
                  }}
                >
                  <DrawerComponent />
                </Box>
              </Toolbar>
            </AppBar>
          )
        ) : (
          <AppBar
            position="sticky"
            sx={{
              backgroundColor: "whitesmoke",
            }}
          >
            <Toolbar
              sx={{
                padding: "5px",
              }}
            >
              <Fade in={true} timeout={{ enter: 2000 }}>
                <Link
                  component={NavLink}
                  to="/"
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <img
                    src={desktoplogo}
                    alt="KaamLay Logo"
                    style={{
                      width: "200px",
                      boxShadow: "inherit",
                    }}
                  />
                </Link>
              </Fade>
              <Fade in={true} timeout={{ enter: 2000 }}>
                <Link
                  component={NavLink}
                  to="/"
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
                >
                  <img
                    src={mobilelogo}
                    alt="KaamLay Logo"
                    className="scale-up-center"
                    style={{ width: "50px" }}
                  />
                </Link>
              </Fade>
              <Fade in={true} timeout={{ enter: 2000 }}>
                <Stack
                  className="stack"
                  direction="row"
                  spacing={1}
                  position="absolute"
                  right={1}
                  sx={{
                    mr: "15px",
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                  }}
                >
                  <CustomizedLink
                    className="scale-up-center"
                    component={NavLink}
                    to="/"
                  >
                    Home
                  </CustomizedLink>
                  <CustomizedLink
                    component={NavLink}
                    to="/services"
                    className="scale-up-center"
                  >
                    {" "}
                    Service
                  </CustomizedLink>
                  <CustomizedLink
                    component={NavLink}
                    to="/about"
                    className="scale-up-center"
                  >
                    About
                  </CustomizedLink>
                  <CustomizedLink
                    component={NavLink}
                    to="/contactus"
                    className="scale-up-center"
                  >
                    Contact Us
                  </CustomizedLink>
                  <Box>
                    <Button
                      variant="contained"
                      style={{ margin: "0px auto", display: "block" }}
                      onClick={openlogin}
                      sx={{
                        fontSize: "15px",
                        fontWeight: "1px",
                        color: "black",
                        textAlign: "center",
                        textDecoration: "none",
                        width: "150px",
                        postition: "absolute",
                        right: "1px",
                        backgroundColor: "#fa541c",

                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </Stack>
              </Fade>
              {/*           
          <Button sx={{ display: { xs: "inline-flex", md: "none"} ,
         position: 'absolute',
          right: "10px", 
         
         color: "#fa541c"}} 
         onClick={()=>{
          
         }}
         >
                  <MenuIcon fontSize='large' />
          </Button> */}
              <Box
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  position: "absolute",
                  right: "10px",
                  color: "#fa541c",
                }}
              >
                <DrawerComponent />
              </Box>

              {/* <MenuIcon sx={{ display: { xs: "inline-flex", md: "none" }, position: 'absolute', right: "10px", fontSize: "50px", color: "#fa541c" }}  component={<Drawer/>}/> */}
            </Toolbar>
          </AppBar>
        )}
      </ThemeProvider>
    </>
  );
};

export default Navbar;
