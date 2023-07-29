import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import AllQueriesTable from "./Tables/AllQueriesTable";

const AllQueries = () => {
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
        <AllQueriesTable />
      </Box>
    </>
  );
};

export default AllQueries;
