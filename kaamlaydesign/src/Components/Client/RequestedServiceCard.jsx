import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid, useScrollTrigger } from "@mui/material";
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
  "&:hover": {
    color: "white",
    backgroundColor: "black",
  },
});

const RequestedServiceCard = ({ details, deleteItem }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const navigate = useNavigate();

  console.log("Hello From Card Component");
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteItem(details.serviceId);
  };

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleClickOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
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
          <Grid
            item
            xs={8}
            sx={
              {
                // border: "1px solid",
                // height: 150,
                // display: "flex",
                // alignItems: "stretch",
              }
            }
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
                src={`http://localhost:5000/${details.clientPicture}`}
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
            <CustomizedButton
              sx={{
                ml: 3,
              }}
              onClick={handleClickOpenDeleteConfirmation}
            >
              Delete Service
            </CustomizedButton>
            <CustomizedButton
              sx={{
                ml: 3,
              }}
              onClick={() => {
                localStorage.setItem("requestedServiceId", details.serviceId);
                navigate("/seeoffers");
              }}
            >
              See Offers
            </CustomizedButton>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure ? You Want To Delete Requested Service
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestedServiceCard;
