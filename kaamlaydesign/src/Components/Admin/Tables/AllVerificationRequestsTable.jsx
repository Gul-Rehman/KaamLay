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
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

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

export default function AllVerificationRequestsTable() {
  const [requests, setRequests] = useState([]);

  const acceptverification = (userId) => {
    axios
      .post(
        `http://localhost:5000/api/verificationrequests/acceptverification/${userId}`
      )
      .then((response) => {
        console.log(response);
        setRequests(requests.filter((item) => item._id !== userId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/verificationrequests")
      .then((response) => {
        console.log(response);
        setRequests(response.data);
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>

              <StyledTableCell align="right">User Id</StyledTableCell>
              <StyledTableCell align="right">Request Id</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length <= 0 && (
              <Typography>
                There Are No Verifications Requests At The Moment
              </Typography>
            )}
            {requests.map((item) => {
              return (
                <>
                  <StyledTableRow key={item.name}>
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
                      {item.user._id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item._id}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={() => {
                          handleClickOpen();
                        }}
                      >
                        See Images
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => acceptverification(item.user._id)}
                      >
                        Accept
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Images"}
                    </DialogTitle>

                    {item.imageUrls.map((item) => {
                      return (
                        <Box
                          component={"img"}
                          src={`http://localhost:5000/${item}`}
                          alt={"Images"}
                          sx={{
                            width: 400,
                            height: 200,
                            margin: 3,
                            border: "1px solid black",
                          }}
                        />
                      );
                    })}

                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 20]}
        count={requests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
