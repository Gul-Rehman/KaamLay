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
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
            {services.map((item) => (
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
                <StyledTableCell align="right">{item.user._id}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" onClick={handleClickOpen}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure, You Want To Delete That Service?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
      <TablePagination
        component="div"
        count={services.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
