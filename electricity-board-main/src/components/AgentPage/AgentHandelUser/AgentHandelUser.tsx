// import { Component } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button, Grid, styled } from "@mui/material";

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
//   createData("Abhishek", "Solar", 6.0),
//   createData("Sarthak", "Industrial", 9.0),
//   createData("Neha", "HouseHold", 16.0),
// ];

// export default class AgentHandelUser extends Component {
//   render() {
//     return (
//       <>
//         <TableContainer
//           component={Paper}
//           sx={{ marginTop: "5rem", marginLeft: "1rem", marginRight: "1rem" }}
//         >
//           <Table sx={{ minWidth: 600 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>User Name</StyledTableCell>
//                 <StyledTableCell align="center">Meter Type</StyledTableCell>
//                 <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
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
//                     <Button variant="contained">Add</Button>
//                   </StyledTableCell>

//                   <StyledTableCell align="center">
//                     <Button variant="contained">Delete</Button>
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
import AddIcon from "@mui/icons-material/Add";
import { Box, Modal } from "@mui/material";

import Fab from "@mui/material/Fab";
import AddReadings from "./AddReadings";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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
// function createData(id: number, name: string, email: string) {
//   return { id, name, email };
// }

const rows: any = [];
export default class AgentHandelUser extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 6,
      data: "",
      rows: [],
      openAddReading: false,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  async getAgentsData() {
    const response = await http.get("customer/getAllCustomers");
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
  render(): React.ReactNode {
    const { page, rowsPerPage, rows, openAddReading } = this.state;
    return (
      <div>
        <Paper sx={{ marginLeft: "1.5rem", width: "95%" }}>
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
                          Add
                        </Button> */}
                        <Fab
                          sx={{ margin: "0.5rem", marginLeft: "2rem" }}
                          size="medium"
                          color="primary"
                          aria-label="edit"
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              openAddReading: true,
                            });
                          }}
                        >
                          <AddIcon />
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
          open={openAddReading}
          onClose={() => {
            this.setState({ ...this.state, openAddReading: false });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddReadings />
          </Box>
        </Modal>
      </div>
    );
  }
}
