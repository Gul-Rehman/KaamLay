import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid, Rating } from "@mui/material";
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
import ReverseGeocodingMap from "../ReverseGeocodingMap";
const CustomizedButton = styled(Button)({
  backgroundColor: `${ColorConfigs.primary}`,
  borderRadius: 8,
  color: "white",
  width: "30%",

  "&:hover": {
    color: "white",
    backgroundColor: "black",
  },
});

const PendingServiceCard = ({ details, completeService }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("Hello From Pending Service Card Component");
  const navigate = useNavigate();
  const [ratingValue, setRatingValue] = useState(4);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openCancelConfirmationDialog, setOpenCancelConfirmationDialog] =
    useState(false);

  const handleClickOpenCancelConfirmationDialog = () => {
    setOpenCancelConfirmationDialog(true);
  };

  const closeCancelConfirmationDialog = () => {
    setOpenCancelConfirmationDialog(false);
  };
  const [
    openCompletionConfirmationDialog,
    setOpenCompletionConfirmationDialog,
  ] = useState(false);

  const handleClickOpenCompletionConfirmationDialog = () => {
    setOpenCompletionConfirmationDialog(true);
  };

  const closeCompletionConfirmationDialog = () => {
    setOpenCompletionConfirmationDialog(false);
  };

  const handleCompleteService = () => {
    completeService(details.bookedServiceId);
  };
  return (
    <>
      <Box
        component={Paper}
        sx={{
          flexGrow: 1,
          margin: 5,
          padding: 3,
          border: `2px solid ${ColorConfigs.primary}`,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={2} position="relative">
          <Grid item xs={8}>
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
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{}}>
            <Stack
              sx={{
                alignItems: "center",
                float: "right",
              }}
            >
              <Avatar
                alt="Service Provider Picture"
                src={`http://localhost:5000/${details.serviceproviderPicture}`}
                sx={{
                  width: 150,
                  height: 150,
                  float: "right",
                  border: `3px solid ${ColorConfigs.primary}`,
                }}
              />
              <Typography>{details.serviceproviderName}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box>
              {details.serviceImages.length > 0 ? (
                details.serviceImages.map((item) => {
                  return (
                    <img
                      style={{
                        objectFit: "contain",
                        width: 100,
                        height: 100,
                        border: "1px solid gray",
                        borderRadius: 5,
                        marginTop: 4,
                      }}
                      src={`http://localhost:5000/${item}`}
                    />
                  );
                })
              ) : (
                <Typography color="primary">
                  *There are no images to show
                </Typography>
              )}
              {console.log(`http://localhost:5000/${details.serviceImage}`)}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Stack>
              <Stack direction="row" justifyContent="space-between">
                {details.serviceCharges && (
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
                        My Contact Number:
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
                )}
                <Stack sx={{ mt: 3 }}>
                  <Stack>
                    <Stack direction="row">
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "black",
                        }}
                      >
                        Client Name:
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
                        Client Contact Number:
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
                        Client Address:
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
                    <Button variant="contained" onClick={handleClickOpenDialog}>
                      View Client Pin Location
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              // float: "right",
              // position: "relative",
              // border: "1px solid",
              // height: 150,
              // display: "flex",
              // alignItems: "stretch",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CustomizedButton onClick={handleClickOpenCancelConfirmationDialog}>
              {" "}
              Cancel Service
            </CustomizedButton>
            <CustomizedButton
              sx={{
                ml: 3,
                // float: "right",
                // position: "absolute",
                // bottom: 1,
                // right: 1,
              }}
              // key={item.user._id}
              onClick={handleClickOpenCompletionConfirmationDialog}
            >
              Service Completed
            </CustomizedButton>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={openDialog}
        // onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <Box sx={{ width: "100%", height: 400 }}>
          <ReverseGeocodingMap
            latitude={details.clientPinLocation.coordinates.latitude}
            longitude={details.clientPinLocation.coordinates.longitude}
          />
        </Box>

        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCancelConfirmationDialog}
        // onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure? You Want To Canel Pending Service?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeCancelConfirmationDialog}>
            Cancel
          </Button>
          <Button variant="contained" onClick={closeCancelConfirmationDialog}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCompletionConfirmationDialog}
        // onClose={handleCloseDialog}

        // fullWidth
      >
        <DialogTitle>{"Service Completion Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By Confirming This You Are Assuring That This Service Is Completed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={closeCompletionConfirmationDialog}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCompleteService}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PendingServiceCard;
