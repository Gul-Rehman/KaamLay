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
    // border: `1px solid black`,
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
    // border: `1px solid ${ColorConfigs.primary}`,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function AllPostedServicesTable() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getservices")
      .then((response) => {
        console.log(response);
        setServices(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Avatar</StyledTableCell>
            <StyledTableCell align="right">Service Title</StyledTableCell>
            <StyledTableCell align="right">Service Category</StyledTableCell>
            <StyledTableCell align="right">Service Id</StyledTableCell>
            <StyledTableCell align="right">User Id</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((item) => (
            <StyledTableRow key={item.user.name}>
              <StyledTableCell component="th" scope="row">
                {item.user.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Avatar
                  alt="Remy Sharp"
                  src={`http://localhost:5000/${item.user.profile.profilepicture}`}
                  sx={{ width: 56, height: 56 }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.servicetitle}
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.servicecategory}
              </StyledTableCell>
              <StyledTableCell align="right">{item._id}</StyledTableCell>
              <StyledTableCell align="right">{item.user._id}</StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained">Delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
