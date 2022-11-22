import React, { Component } from "react";
import http from "../../../services/httpMethod";
import { Box, Button, Modal } from "@mui/material";
import { Field, Form, Formik } from "formik";
// import { rows } from "../AdminHandelMeterType/AdminHandelMeterType";

export default class EditUserHandel extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "",
      rows: [],
      openAddCustomer: false,
    };
  }
  async getUserData() {
    const response = await http.get("customer/getAllCustomers");
    console.log(response.data);
    this.setState({ ...this.state, rows: response.data });
  }
  componentDidMount(): void {
    this.getUserData();
  }
  render() {
    //  const { rows } = this.state;
    const AddCustomerHandler = async (values: any) => {
      console.log(values);
      const response = await http.post("customer/addCustomer", values);
      console.log(response);
    };

    return (
      <div>
        <Formik
          initialValues={{ name: "", email: "" }}
          onSubmit={(credentials) => {
            AddCustomerHandler(credentials);
          }}
        >
          <Form>
            <h1>Add Customer</h1>

            <Field name="name" type="text" placeholder="Enter your Name">
              {/* {rows.name} */}
            </Field>

            <Field name="email" type="text" placeholder="Enter your Email">
              {/* {rows.email} */}
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
                this.setState({ ...this.state, openAddCustomer: false });
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
