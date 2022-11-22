import { Component } from "react";
import Header from "../../components/Header/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, styled } from "@mui/material";
import AgentHandelUser from "../../components/AgentPage/AgentHandelUser/AgentHandelUser";

export default class Agent extends Component {
  render() {
    return (
      <>
        <Header name="Agent" />
        <AgentHandelUser />
      </>
    );
  }
}
