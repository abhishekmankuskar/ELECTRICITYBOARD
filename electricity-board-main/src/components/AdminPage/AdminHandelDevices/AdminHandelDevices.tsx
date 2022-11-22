import { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, styled } from "@mui/material";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name: string, Meter: string, fat: number) {
  return { name, Meter, fat };
}

export const rows = [
  createData("Abhishek", "Industrial", 6.0),
  createData("Sarthak", "Solar", 9.0),
  createData("Neha", "Household", 16.0),
];

export default class AdminHandelDevices extends Component {
  render() {
    return (
      <>
        <TableContainer
          component={Paper}
          sx={{ marginTop: "6rem", marginLeft: "6rem" }}
        >
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer Name</StyledTableCell>
                <StyledTableCell align="center">Meter Type</StyledTableCell>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Button</StyledTableCell>
                <StyledTableCell align="center">Button</StyledTableCell>
                <StyledTableCell align="center">Button</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Meter}</StyledTableCell>
                  <StyledTableCell align="center">{row.fat}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Button variant="contained">Assign Agent</Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <Button variant="contained">Edit</Button> */}
                    <Fab size="medium" color="secondary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* <Button variant="contained">Delete</Button> */}
                    <Fab size="medium" color="secondary" aria-label="edit">
                      <DeleteIcon />
                    </Fab>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
