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
import styles from "./AdminHandelAgents.module.scss";

import { Box, Modal } from "@mui/material";
import { Field, Form, Formik } from "formik";

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
export default class AdminHandelAgents extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 2,
      data: "",
      rows: [],
      openAddAgent: false,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  async getAgentsData() {
    const response = await http.get("user/getAllAgents");
    console.log(response.data);
    this.setState({ ...this.state, rows: response.data });
  }
  componentDidMount(): void {
    this.getAgentsData();
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

  deleteAgent = async (id: any) => {
    const response = await http.delete(`customer/deleteCustomer/${id}`);
    console.log(response);
  };

  render(): React.ReactNode {
    const { page, rowsPerPage, rows, openAddAgent } = this.state;
    const AddAgentHandler = async (values: any) => {
      console.log(values);
      const response = await http.post("auth/addUser", values);
      console.log(response);
      if (response.getAgentsData) {
        this.setState({ ...this.state, openAddAgent: false });
      }
    };

    return (
      <div>
        <h2 style={{ marginTop: "2rem", marginLeft: "9rem" }}>Agent Table</h2>
        <Button
          sx={{ position: "absolute", marginTop: "-2rem", marginLeft: "54rem" }}
          variant="contained"
          onClick={() => {
            this.setState({ ...this.state, openAddAgent: true });
          }}
        >
          Add Agents
        </Button>

        <Paper sx={{ marginLeft: "8rem", width: "100%" }}>
          <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Agent ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email ID</StyledTableCell>
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

                        {/* <Button
                          variant="contained"
                          sx={{ marginTop: "0.5rem", border: "none" }}
                        >
                          Edit
                        </Button> */}
                        <Fab
                          sx={{ margin: "1rem" }}
                          size="medium"
                          color="secondary"
                          aria-label="edit"
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
                          onClick={() => this.deleteAgent(row.id)}
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
          open={openAddAgent}
          onClose={() => {
            this.setState({ ...this.state, openAddAgent: false });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.main}>
              <Formik
                initialValues={{ name: "", email: "", role: "" }}
                onSubmit={(credentials) => {
                  AddAgentHandler(credentials);
                }}
              >
                <Form>
                  <h1>Add Agent</h1>

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
                    name="role"
                    type="text"
                    placeholder="Enter your Role"
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
                      this.setState({ ...this.state, openAddAgent: false });
                    }}
                  >
                    Close
                  </Button>
                </Form>
              </Formik>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
}
