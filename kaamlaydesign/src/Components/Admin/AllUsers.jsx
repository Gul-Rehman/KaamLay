import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import AllUsersTable from "./Tables/AllUsersTable";

const AllUsers = () => {
  const searchUser = () => {
    axios
      .get(`http://localhost:5000/user/getuser/${userId}`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState("");
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
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <Button variant="contained" sx={{ ml: 3 }} onClick={searchUser}>
          Search
        </Button>
      </Box> */}
      <Box
        paddingTop={3}
        sx={{
          mt: 6,
        }}
      >
        <AllUsersTable users={users} />
      </Box>
    </>
  );
};

export default AllUsers;
