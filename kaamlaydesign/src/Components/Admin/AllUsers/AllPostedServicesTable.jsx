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
import TablePagination from "@mui/material/TablePagination";
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>

              <StyledTableCell align="right">Service Title</StyledTableCell>
              <StyledTableCell align="right">Service Category</StyledTableCell>
              <StyledTableCell align="right">Service Id</StyledTableCell>
              <StyledTableCell align="right">User Id</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <StyledTableRow key={item.user.name}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://localhost:5000/${item.user.profile?.profilepicture}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.user.name}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {item.servicetitle}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.servicecategory}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item._id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.user._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained">Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 20]}
        count={services.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
