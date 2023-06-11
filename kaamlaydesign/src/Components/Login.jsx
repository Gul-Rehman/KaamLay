import React, { useState, useContext } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useNavigate } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import axios from "axios";
import AdminPrivateComponent from "./Admin/AdminPrivateComponent";

function Copyright(props) {
  {
  }
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Kaam Lay
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  };

  const [userRole, setUserRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (email == "admin" && password == "gulgrs3569") {
      <AdminPrivateComponent auth={true} />;
    } else {
      <AdminPrivateComponent auth={false} />;
    }

    // if (!name) {
    //   newErrors.name = "Name is required";
    // }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await axios
        .post("http://localhost:5000/api/user/login", {
          email,
          password,
        })
        .then(async (response) => {
          console.log(response);
          console.log(response);
          localStorage.setItem("token", response.data.token);

          console.log(response.data.user._id);

          localStorage.setItem("userId", response.data.user._id);
          axios
            .get(
              `http://localhost:5000/api/userstatus/${response.data.user._id}`
            )
            .then(async (response) => {
              console.log(response.data.status);
              setUserRole(response.data.status);

              if (response.data.user.name == "admin") {
                localStorage.setItem("userrole", "admin");
                navigate("/admindashboard");
              } else if (response.data.status == "client") {
                localStorage.setItem("userrole", response.data.status);
                navigate("/clientdashboard");
              } else {
                localStorage.setItem("userrole", response.data.status);
                navigate("/serviceproviderdashboard");
              }
            })
            .catch((err) => {
              console.error(err.message);
            });
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://www.checkatrade.com/blog/wp-content/uploads/2020/08/electrician-hourly-rates.jpeg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#fa541c" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={!!errors.password}
                  helperText={errors.password}
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />

                <Stack direction="row" sx={{}}>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "black",
                      textAlign: "center",
                      backgroundColor: "#fa541c",
                      borderRadius: "10px",
                      width: "150px",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                    type="submit"
                  >
                    Login
                  </Button>

                  <Link
                    component={NavLink}
                    to="/signup"
                    sx={{
                      marginLeft: "100px",
                      alignSelf: "center",
                    }}
                  >
                    Not Have An Account? Signup
                  </Link>
                </Stack>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Login;
