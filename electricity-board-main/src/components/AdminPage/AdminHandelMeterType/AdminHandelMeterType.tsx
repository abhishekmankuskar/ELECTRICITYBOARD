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
import styles from "./AdminHandelMeterType.module.scss";
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
export default class AdminHandelMeterType extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 4,
      data: "",
      rows: [],
      openAddMeter: false,
      openEditMeter: false,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  async getMeterData() {
    const response = await http.get("meter/getAllMeter");
    console.log(response.data);
    this.setState({ ...this.state, rows: response.data });
  }
  componentDidMount(): void {
    this.getMeterData();
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

  deleteMeter = async (id: any) => {
    const response = await http.delete(`customer/deletMeter/${id}`);
    console.log(response);
  };

  render(): React.ReactNode {
    const { page, rowsPerPage, rows, openAddMeter, openEditMeter } = this.state;

    const AddMeterHandler = async (values: any) => {
      console.log(values);
      const response = await http.post("meter/addMeter", values);
      console.log(response);
      if (response.data) {
        this.setState({ ...this.state, openAddMeter: false });
      }
    };

    return (
      <div>
        <h2 style={{ marginTop: "2rem", marginLeft: "9rem" }}>Meter Table</h2>
        <Button
          sx={{ position: "absolute", marginTop: "-2rem", marginLeft: "54rem" }}
          variant="contained"
          onClick={() => {
            this.setState({ ...this.state, openAddMeter: true });
          }}
        >
          Add Meter
        </Button>

        <Paper sx={{ marginLeft: "8rem", width: "100%" }}>
          <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Meter ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">
                    Fault Tolerance
                  </StyledTableCell>
                  <StyledTableCell align="center">Rate/Unit</StyledTableCell>
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
                          {row.meterType}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.faultTolerance}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.ratePerUnit}
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
                              openEditMeter: true,
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
                          onClick={() => this.deleteMeter(row.id)}
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
          open={openAddMeter}
          onClose={() => {
            this.setState({ ...this.state, openAddMeter: false });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.main}>
              <Formik
                initialValues={{ meterType: "", faultTolerance: "", rate: "" }}
                onSubmit={(credentials) => {
                  AddMeterHandler(credentials);
                }}
              >
                <Form>
                  <h1>Add Meter</h1>

                  <Field
                    name="meterType"
                    type="text"
                    placeholder="Enter Meter Name"
                  />

                  <Field
                    name="faultTolerance"
                    type="text"
                    placeholder="Enter Fault Tolerance"
                  />
                  <Field
                    name="ratePerUnit"
                    type="text"
                    placeholder="Enter RAte Per Unit"
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
                      this.setState({ ...this.state, openAddMeter: false });
                    }}
                  >
                    Close
                  </Button>
                </Form>
              </Formik>
            </div>
          </Box>
        </Modal>
        {/* <Modal
          open={openEditMeter}
          onClose={() => {
            this.setState({ ...this.state, openEditMeter: false });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditUserHandel />
          </Box>
        </Modal> */}
      </div>
    );
  }
}
