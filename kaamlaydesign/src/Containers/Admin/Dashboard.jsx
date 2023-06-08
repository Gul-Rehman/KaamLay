import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  AllPostedServices,
  AllRequestedServices,
  AllUsers,
  TotalUsers,
} from "../../Components";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AdminDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
        pb: 3,
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "15%" }}
      >
        <Tab label="All Users" />
        <Tab label="All Posted Services" />
        <Tab label="All Requested Services" />
        <Button
          variant="contained"
          sx={{
            alignSelf: "flex-end",
          }}
        >
          {" "}
          Logout
        </Button>
      </Tabs>
      <Box sx={{ width: "100%" }}>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            right: 25,
            top: 25,
          }}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </Button>
        <TabPanel value={value} index={0}>
          <AllUsers />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllPostedServices />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllRequestedServices />
        </TabPanel>
      </Box>
    </Box>
  );
}
