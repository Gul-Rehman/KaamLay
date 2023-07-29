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
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
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
  // marginLeft: "auto",
  // marginTop: 10,
  // width: 400,
  "&:hover": {
    color: "white",
    backgroundColor: "black",
  },
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OfferCard = ({ details }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const showSuccess = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const acceptoffer = async () => {
    await axios.post(
      "http://localhost:5000/api/offer/acceptoffer",
      {
        requestedserviceid: localStorage.getItem("requestedServiceId"),
        serviceproviderid: details.serviceproviderId,
      },
      {
        headers: {
          authtoken: localStorage.getItem("token"),
        },
      }
    );
  };
  // const navigate = useNavigate();
  console.log("Hello See Offer From Card Component");
  const navigate = useNavigate();
  const [ratingValue, setRatingValue] = useState(4);
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
              <Typography>Service Proposal :</Typography>
              <Stack direction="row">
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "GrayText",
                  }}
                >
                  {details.serviceProposal}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{}}>
            <Stack
              sx={{
                // position: "absolute",
                // right: 20,
                // top: 20,
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
              {/* <Rating
                name="read-only"
                value={ratingValue}
                readOnly
                sx={{ mt: 2 }}
              /> */}
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={
                  {
                    // padding: "0px 50px",
                  }
                }
              >
                {details.serviceCharges && (
                  <Stack>
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
                )}
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
            <CustomizedButton onClick={acceptoffer}>
              Accept Offer
            </CustomizedButton>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", fontSize: "16pt" }}
        >
          Offer Accepted
        </Alert>
      </Snackbar>
    </>
  );
};

export default OfferCard;
