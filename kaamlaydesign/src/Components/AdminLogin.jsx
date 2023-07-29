import React, { useState, createContext, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminIllstration from "../Assets/adminloginillustration.svg";
import { Paper } from "@mui/material";
import ColorConfigs from "../Configs/ColorConfigs";
import AdminPrivateComponent from "./Admin/AdminPrivateComponent";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="localhost:3000">
        Kaam Lay
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("Jesse Hall");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("");

  const handleLogin = async () => {
    await axios
      .post(`http://localhost:5000/api/admin/adminlogin`, {
        username,
        password,
      })
      .then(async (response) => {
        console.log(response);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate(`/admindashboard`);
        }, 2000);
        localStorage.setItem("admintoken", response.data.token);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        // height={"100vh"}
        // marginTop={-10}
      >
        <Box>
          <Box
            component={"img"}
            src={AdminIllstration}
            alt="illustration"
            width={700}
            marginLeft={5}
          />
        </Box>
        <Container
          component={Paper}
          elevation={4}
          maxWidth="xs"
          sx={{
            borderRadius: 10,
            padding: 5,
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: `${ColorConfigs.primary}` }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
            <Box
              component="form"
              // onSubmit={}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(event) => {
                  setUserName(event.target.value);
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
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Logged In Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminLogin;
