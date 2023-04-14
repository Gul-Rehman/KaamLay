import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const CustomizedListItem = styled(ListItem)({
  //backgroundColor:"#fa541c",
  color: "black",
  "&:hover": {
    backgroundColor: "#fa541c",
    color: "white",
  },
  "&:focus": {
    backgroundColor: "#fa541c",
    color: "white",
  },
});
const DrawerComponent = () => {
  const [openDrawer, setopenDrawer] = useState(false);
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const opensignup = () => {
    navigate("/signup");
  };

  const openlogin = () => {
    navigate("/login");
  };
  return (
    <>
      {auth ? (
        <>
          <Drawer
            open={openDrawer}
            onClose={() => setopenDrawer(false)}
            anchor="right"
          >
            <List disablePadding>
              <CustomizedListItem component={NavLink} to="/clientdashboard">
                <ListItemButton>
                  <ListItemText> Dashboard </ListItemText>
                </ListItemButton>
              </CustomizedListItem>

              <CustomizedListItem
                component={NavLink}
                to="/clientcompletedservices"
              >
                <ListItemButton>
                  <ListItemText>Completed Services</ListItemText>
                </ListItemButton>
              </CustomizedListItem>
              <CustomizedListItem
                component={NavLink}
                to="/clientbookedservices"
              >
                <ListItemButton>
                  <ListItemText>Booked Services</ListItemText>
                </ListItemButton>
              </CustomizedListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    color: "black",
                    textAlign: "center",
                    backgroundColor: "#fa541c",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  onClick={logout}
                >
                  Logout
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>

          <IconButton
            onClick={() => {
              setopenDrawer(!openDrawer);
            }}
            sx={{ color: "#fa541c" }}
          >
            <MenuIcon fontSize="large" color="#fa541c" />
          </IconButton>
        </>
      ) : (
        <>
          <Drawer
            open={openDrawer}
            onClose={() => setopenDrawer(false)}
            anchor="right"
          >
            <List disablePadding>
              <CustomizedListItem component={NavLink} to="/">
                <ListItemButton>
                  <ListItemText> Home </ListItemText>
                </ListItemButton>
              </CustomizedListItem>

              <CustomizedListItem component={NavLink} to="/services">
                <ListItemButton>
                  <ListItemText>Service</ListItemText>
                </ListItemButton>
              </CustomizedListItem>
              <CustomizedListItem component={NavLink} to="/about">
                <ListItemButton>
                  <ListItemText>About</ListItemText>
                </ListItemButton>
              </CustomizedListItem>
              <CustomizedListItem component={NavLink} to="/contactus">
                <ListItemButton>
                  <ListItemText>Contact Us</ListItemText>
                </ListItemButton>
              </CustomizedListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    color: "black",
                    textAlign: "center",
                    backgroundColor: "#fa541c",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  onClick={openlogin}
                >
                  Login
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    color: "black",
                    textAlign: "center",
                    backgroundColor: "#fa541c",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  onClick={opensignup}
                >
                  Signup
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>

          <IconButton
            onClick={() => {
              setopenDrawer(!openDrawer);
            }}
            sx={{ color: "#fa541c" }}
          >
            <MenuIcon fontSize="large" color="#fa541c" />
          </IconButton>
        </>
      )}
    </>
  );
};

export default DrawerComponent;
