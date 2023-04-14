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

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

import { useNavigate } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import axios from "axios";

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

const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // const handleSubmit = async () => {
  //   const result = await fetch("http://localhost:5000/api/user/login", {
  //     method: "post",
  //     body: JSON.stringify({ email, password }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const finalresult = await result.json();
  //   console.log(finalresult);
  //   // localStorage.setItem("user", JSON.stringify(finalresult.user));
  //   localStorage.setItem("token", finalresult);
  //   if (finalresult) {
  //     console.log(finalresult);
  //     navigate("/clientdashboard");
  //   }
  // };
  const [userRole, setUserRole] = useState("");

  const handleSubmit = async () => {
    navigate("/");
    await axios
      .post("http://localhost:5000/api/user/login", {
        email,
        password,
      })
      .then(async (response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        // a.setUserName(response.data.user.name);
        console.log(response.data.user._id);

        localStorage.setItem("userId", response.data.user._id);
        axios
          .get(`http://localhost:5000/api/userstatus/${response.data.user._id}`)
          .then(async (response) => {
            console.log(response.data.status);
            setUserRole(response.data.status);
            // navigate("/");
            // a.setUserName(response.data.status);
            if (response.data.status == "client") {
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

    // localStorage.setItem("user", JSON.stringify(finalresult.user));

    // if (result) {
    //   console.log(result);
    //   navigate("/clientdashboard");
    // }
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
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
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
                    onClick={handleSubmit}
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
                {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  {/* <h2>{name}</h2>
                  <h2>{email}</h2>
                  <h2>{password}</h2> */}
                {/* </Grid>
              </Grid> */}
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
