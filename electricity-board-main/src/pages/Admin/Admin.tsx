import { Component } from "react";
import Sidebar from "../../components/AdminPage/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Header name="Admin" />

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={8}>
            <Outlet />
            {/*  */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

// //////////////////////////////////////////////////////////////////
