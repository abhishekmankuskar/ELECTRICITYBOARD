import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageRoute from "./pages/PageRoute/PageRoute";

import { Component } from "react";
import { BrowserRouter } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <PageRoute />
        </BrowserRouter>
      </>
    );
  }
}
