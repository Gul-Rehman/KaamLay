import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import AllVerificationRequestsTable from "./Tables/AllVerificationRequestsTable";

const AllVerificationRequests = () => {
  const handleVerify = (userId) => {
    axios
      .post(
        `http://localhost:5000/api/verificationrequests/acceptverification/${userId}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      {/* <Box>
        <TextField
          placeholder="Enter User Id"
          sx={{
            "& .MuiInputBase-root": {
              height: 40,
            },
          }}
        />
        <Button variant="contained" sx={{ ml: 3 }}>
          Search
        </Button>
      </Box> */}
      <Box
        paddingTop={3}
        sx={{
          mt: 6,
        }}
      >
        <AllVerificationRequestsTable verifyfunction={handleVerify} />
      </Box>
    </>
  );
};

export default AllVerificationRequests;
