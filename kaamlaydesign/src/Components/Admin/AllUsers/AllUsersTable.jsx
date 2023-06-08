import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ColorConfigs from "../../../Configs/ColorConfigs";
import axios from "axios";
import { Avatar, Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: `${ColorConfigs.primary}`,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllUsersTable() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/getusers/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const deleteUser = (userId) => {
  //   axios
  //     .delete(`http://localhost:5000/api/user/deleteuser/${userId}`)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const [userId, setUserId] = useState("");
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>

              <StyledTableCell align="right">User Id</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => {
              return (
                <StyledTableRow key={item.name}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://localhost:5000/${item.profile?.profilepicture}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>

                  <StyledTableCell align="right">{item._id}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained">Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
