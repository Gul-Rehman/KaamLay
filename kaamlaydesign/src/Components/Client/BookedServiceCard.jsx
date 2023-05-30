import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import ColorConfigs from "../../Configs/ColorConfigs";
import { Button } from "@mui/material";
import { styled } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const CustomizedButton = styled(Button)({
  backgroundColor: `${ColorConfigs.primary}`,
  borderRadius: 8,
  color: "white",
  width: "30%",
  marginLeft: "auto",
  marginTop: 10,
  width: 400,
  "&:hover": {
    color: "white",
    backgroundColor: "black",
  },
});

const ServiceCard = ({ details }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const navigate = useNavigate();
  console.log("Hello From Card Compoentn");
  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        margin: 5,
        padding: 3,
        border: `2px solid ${ColorConfigs.primary}`,
        borderRadius: 4,
      }}
    >
      <Stack>
        <Stack direction="row">
          <Typography
            sx={{
              fontSize: 40,
              color: `${ColorConfigs.primary}`,
            }}
          >
            {details.serviceTitle}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography
            sx={{
              fontSize: 20,
              color: "GrayText",
            }}
          >
            {details.serviceDescription}
          </Typography>
        </Stack>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              padding: "0px 50px",
            }}
          >
            <Stack>
              <Stack direction="row" sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "black",
                  }}
                >
                  Service Category:
                </Typography>
                {/* <Stack direction></Stack> */}

                <Typography
                  sx={{
                    fontSize: 15,
                    color: "GrayText",
                  }}
                >
                  {details.serviceCategory}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "black",
                  }}
                >
                  Service Provider Contact Number:
                </Typography>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "GrayText",
                  }}
                >
                  {details.serviceproviderContactNumber}
                </Typography>
              </Stack>

              <Stack direction="row" sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "black",
                  }}
                >
                  Price:
                </Typography>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "GrayText",
                  }}
                >
                  {details.serviceCharges}
                </Typography>
              </Stack>
            </Stack>

            <Stack sx={{ mt: 3 }}>
              <Stack>
                <Stack direction="row">
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: "black",
                    }}
                  >
                    Your Name:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: "GrayText",
                    }}
                  >
                    {details.clientName}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: "black",
                    }}
                  >
                    Your Contact Number:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: "GrayText",
                    }}
                  >
                    {details.clientContactNumber}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: "black",
                    }}
                  >
                    Your Address:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: "GrayText",
                    }}
                  >
                    {details.clientAddress}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Stack direction="row" mt={3}>
          <CustomizedButton
            // key={item.user._id}
            onClick={() => {
              localStorage.setItem(
                "serviceproviderId",
                details.serviceproviderId
              );
              localStorage.setItem("servicetype", "plumbing");
              // navigate("/clientbookservice");
            }}
          >
            {" "}
            Edit Service
          </CustomizedButton>
          <CustomizedButton
            // key={item.user._id}
            onClick={() => {
              // localStorage.setItem(
              //   "serviceproviderId",
              //   details.serviceproviderId
              // );
              // localStorage.setItem("servicetype", "plumbing");
              // navigate("/clientbookservice");
              handleClickOpen();
            }}
          >
            {" "}
            Cancel Service
          </CustomizedButton>
        </Stack>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure? Want To Canel Service
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceCard;
