// import { Component } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button, Grid, styled } from "@mui/material";
// import Fab from "@mui/material/Fab";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },

//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name: string, Meter: string, fat: number) {
//   return { name, Meter, fat };
// }

// export const rows = [
//   createData("Abhishek", "Industrial", 6.0),
//   createData("Sarthak", "Solar", 9.0),
//   createData("Neha", "Household", 16.0),
// ];

// export default class AdminHandelUser extends Component {
//   render() {
//     return (
//       <>
//         <Button
//           sx={{ position: "absolute", marginTop: "2rem", marginLeft: "6rem" }}
//           variant="contained"
//         >
//           Add Users
//         </Button>
//         <TableContainer
//           component={Paper}
//           sx={{ marginTop: "6rem", marginLeft: "6rem" }}
//         >
//           <Table sx={{ minWidth: 800 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//                 <StyledTableCell align="center">Meter Type</StyledTableCell>
//                 <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
//                 <StyledTableCell align="center">Button</StyledTableCell>
//                 <StyledTableCell align="center">Button</StyledTableCell>
//                 <StyledTableCell align="center">Button</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <StyledTableRow key={row.name}>
//                   <StyledTableCell component="th" scope="row">
//                     {row.name}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">{row.Meter}</StyledTableCell>
//                   <StyledTableCell align="center">{row.fat}</StyledTableCell>

//                   <StyledTableCell align="center">
//                     <Button variant="contained">Assign Agent</Button>
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {/* <Button variant="contained">Edit</Button> */}
//                     <Fab size="medium" color="secondary" aria-label="edit">
//                       <EditIcon />
//                     </Fab>
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {/* <Button variant="contained">Delete</Button> */}
//                     <Fab size="medium" color="secondary" aria-label="edit">
//                       <DeleteIcon />
//                     </Fab>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </>
//     );
//   }
// }

import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination } from "@mui/material";
import http from "../../../services/httpMethod";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import { Box, Modal } from "@mui/material";
import { Field, Form, Formik } from "formik";
import EditUserHandel from "./EditUserHandel";
import styles from "./AdminHandelUser.module.scss";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: "0",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "0",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    border: "0",
  },
}));

const rows: any = [];
export default class AdminHandelUser extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 4,
      data: "",
      rows: [],
      openAddCustomer: false,
      openEditUser: false,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  async getUserData() {
    const response = await http.get("customer/getAllCustomers");
    console.log(response.data);
    this.setState({ ...this.state, rows: response.data });
  }
  componentDidMount(): void {
    this.getUserData();
  }
  handleChangePage(event: any, newPage: number) {
    this.setState({ ...this.state, page: newPage });
  }
  handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      page: 0,
      rowsPerPage: +event.target.value,
    });
  }

  deleteUser = async (id: any) => {
    const response = await http.delete(`customer/deleteCustomer/${id}`);
    console.log(response);
  };

  render(): React.ReactNode {
    const { page, rowsPerPage, rows, openAddCustomer, openEditUser } =
      this.state;

    const AddCustomerHandler = async (values: any) => {
      console.log(values);
      const response = await http.post("customer/addCustomer", values);
      console.log(response);
      if (response.data) {
        this.setState({ ...this.state, openAddCustomer: false });
      }
    };

    return (
      <div>
        <h2 style={{ marginTop: "2rem", marginLeft: "9rem" }}>
          Customer Table
        </h2>
        <Button
          sx={{ position: "absolute", marginTop: "-2rem", marginLeft: "54rem" }}
          variant="contained"
          onClick={() => {
            this.setState({ ...this.state, openAddCustomer: true });
          }}
        >
          Add Customers
        </Button>

        <Paper sx={{ marginLeft: "8rem", width: "100%" }}>
          <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Customer ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email ID</StyledTableCell>
                  <StyledTableCell align="center">Address</StyledTableCell>
                  <StyledTableCell align="center">Buttons</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.address}
                        </StyledTableCell>
                        {/* <Button
                          variant="contained"
                          sx={{ marginTop: "0.5rem", border: "none" }}
                        >
                          Edit
                        </Button> */}
                        <Fab
                          sx={{ margin: "1rem", marginLeft: "2rem" }}
                          size="medium"
                          color="secondary"
                          aria-label="edit"
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              openEditUser: true,
                            });
                          }}
                        >
                          <EditIcon />
                        </Fab>
                        {/* <Button
                          variant="contained"
                          sx={{
                            marginLeft: "1rem",
                            marginTop: "0.5rem",
                            border: "none",
                          }}
                        >
                          Delete
                        </Button> */}
                        <Fab
                          sx={{ marginLeft: "2rem" }}
                          size="medium"
                          color="secondary"
                          aria-label="edit"
                          onClick={() => this.deleteUser(row.id)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 4, 6]}
            component="div"
            count={rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </Paper>
        <Modal
          open={openAddCustomer}
          onClose={() => {
            this.setState({ ...this.state, openAddCustomer: false });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.main}>
              <Formik
                initialValues={{ name: "", email: "", address: "" }}
                onSubmit={(credentials) => {
                  AddCustomerHandler(credentials);
                }}
              >
                <Form>
                  <h1>Add Customer</h1>

                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your Name"
                  />

                  <Field
                    name="email"
                    type="text"
                    placeholder="Enter your Email"
                  />
                  <Field
                    name="address"
                    type="text"
                    placeholder="Enter your Address"
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ border: "none", marginLeft: "1rem" }}
                  >
                    Add
                  </Button>
                  <Button
                    sx={{ border: "none", margin: "1rem" }}
                    variant="contained"
                    onClick={() => {
                      this.setState({ ...this.state, openAddCustomer: false });
                    }}
                  >
                    Close
                  </Button>
                </Form>
              </Formik>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openEditUser}
          onClose={() => {
            this.setState({ ...this.state, openEditUser: false });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditUserHandel />
          </Box>
        </Modal>
      </div>
    );
  }
}
