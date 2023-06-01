import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AllPostedServicesTable from "./AllUsers/AllPostedServicesTable";

const AllPostedServices = () => {
  return (
    <>
      <Box>
        <TextField
          placeholder="Enter Service Id"
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
        <AllPostedServicesTable />
      </Box>
    </>
  );
};

export default AllPostedServices;
