import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import AllUsersTable from "./AllUsers/AllUsersTable";

const AllUsers = () => {
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
