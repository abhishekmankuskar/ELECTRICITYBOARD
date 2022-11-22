import React, { Component } from "react";

import http from "../../../services/httpMethod";
import { Box, Button, Modal } from "@mui/material";
import { Field, Form, Formik } from "formik";
// import { rows } from "../AdminHandelMeterType/AdminHandelMeterType";

export default class AddReadings extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "",
      rows: [],
    };
  }

  render() {
    // const { rows } = this.state;
    const AddReadingHandler = async (values: any) => {
      console.log(values);
      const response = await http.post("customer/addCustomer", values);
      console.log(response);
    };

    return (
      <div>
        <Formik
          initialValues={{ name: "", email: "" }}
          onSubmit={(credentials) => {
            AddReadingHandler(credentials);
          }}
        >
          <Form>
            <h1>Add Reading</h1>
            <select name="meters" style={{ display: "block" }}>
              <option value="" label="Select a Meter">
                Select type of Meter{" "}
              </option>
              <option value="HouseHold" label="HouseHold">
                {" "}
                House Hold
              </option>
              <option value="Industrial" label="Industrial">
                Industrial
              </option>
              <option value="Solar" label="Solar">
                Solar
              </option>
            </select>

            <Field name="name" type="text" placeholder="Enter your Name">
              {/* {rows.name} */}
            </Field>
            <Field name="file" type="file" placeholder="Enter the file">
              {/* {rows.name} */}
            </Field>

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
                this.setState({ ...this.state, openAddReading: false });
              }}
            >
              Close
            </Button>
          </Form>
        </Formik>
      </div>
    );
  }
}
