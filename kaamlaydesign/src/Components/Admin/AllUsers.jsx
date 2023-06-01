import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import AllUsersTable from "./AllUsers/AllUsersTable";

const AllUsers = () => {
  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/api/allusers/users")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });
  return (
    <>
      <Box>
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
      </Box>
      <Box paddingTop={3}>
        <AllUsersTable />
      </Box>
    </>
  );
};

export default AllUsers;
