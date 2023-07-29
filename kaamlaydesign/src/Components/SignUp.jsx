import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { useNavigate } from "react-router";
// import {Formik} from 'formik';
// import ReactFormInputValidation from "react-form-input-validation";
// import { required, email } from 'redux-form-validators'
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";

function Copyright(props) {
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

const SignUp = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // if (!name) {
    //   newErrors.name = "Name is required";
    // }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      newErrors.name = "Invalid Name";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await axios
        .post("http://localhost:5000/api/user/register", {
          name,
          email,
          password,
        })
        .then(async (response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          // a.setUserName(response.data.user.name);
          console.log(response.data.user._id);
          // navigate("/");
          localStorage.setItem("userId", response.data.user._id);
          axios
            .post(
              `http://localhost:5000/api/userstatus`,
              { status: "client" },
              {
                headers: {
                  authtoken: localStorage.getItem("token"),
                },
              }
            )
            .then(async (response) => {
              console.log(response.data.status);
              setUserRole(response.data.status);
              navigate("/clientdashboard");
              // a.setUserName(response.data.status);
            })
            .catch((err) => {
              console.error(err.message);
            });
        })
        .catch((err) => {
          console.error(err.message);
        });

      // localStorage.setItem("user", JSON.stringify(finalresult.user));

      // if (result) {
      //   console.log(result);
      //   navigate("/clientdashboard");
      // }
    }
  };

  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://major.com.au/wp-content/uploads/2019/12/Carpenter-with-Timber-1.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              // backgroundPosition: "",
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
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  error={!!errors.name}
                  helperText={errors.name}
                  autoFocus
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  error={!!errors.email}
                  helperText={errors.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <TextField
                  error={false}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Stack direction="row">
                  <Button
                    onClick={handleSubmit}
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
                  >
                    Sign Up
                  </Button>
                  <Link
                    component={NavLink}
                    to="/login"
                    alignSelf="center"
                    sx={{
                      marginLeft: "100px",
                    }}
                  >
                    Already Have An Account? Login
                  </Link>
                </Stack>
                {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  {/* <h2>{name}</h2>
                  <h2>{email}</h2>
                  <h2>{password}</h2> */}
                {/* </Grid> */}
                {/* </Grid> */}
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
