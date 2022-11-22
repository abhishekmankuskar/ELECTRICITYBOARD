import { Field, Form, Formik } from "formik";
import http from "../../services/httpMethod";
import styles from "../LoginPage/LoginPage.module.scss";
import { Component, Context, ContextType } from "react";
import { Box, Button, Modal } from "@mui/material";
import { LoginContext } from "./LoginContext";
// import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";

import Snackbar from "@mui/material/Snackbar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Function Starts
export default class LoginPage extends Component<any, any> {
  static contextType?: Context<any> | undefined = LoginContext;
  context!: ContextType<typeof LoginContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      data: "",
      rows: [],
      popup: false,
    };
  }

  render() {
    const { open, popup } = this.state;

    // Login Post Method code
    const loginHandler = async (values: any) => {
      console.log(values);
      const response = await http.post("auth/login", values);
      console.log(response);

      if (response.data.roleId === "635fb524e962be0f00a95d70") {
        this.context.setPageRole("AdminPage");
      } else if (response.data.roleId === "635fb524e962be0f00a95d72") {
        this.context.setPageRole("AgentPage");
      }

      if (response.ok) {
        this.setState({ ...this.state, popup: true });
      }
    };

    // Forgot Password post Handle
    const ForgotPasswordHandler = async (values: any) => {
      console.log(values);
      const response = await http.post("auth/forget-Password", values);
      console.log(response);
    };

    return (
      // Login Page
      <div className={styles.loginPage}>
        <Snackbar
          open={popup}
          autoHideDuration={2000}
          onClose={() => this.setState({ ...this.state, popup: false })}
        >
          <Alert
            onClose={() => this.setState({ ...this.state, popup: false })}
            severity="success"
            sx={{ width: "100%" }}
          >
            Login Successfull
          </Alert>
        </Snackbar>
        ;
        <Formik
          initialValues={{ userName: "", password: "" }}
          onSubmit={(credentials) => {
            loginHandler(credentials);
          }}
        >
          <Form className={styles.loginPageForm}>
            <h1>Login</h1>
            <Field
              name="userName"
              type="text"
              placeholder="Enter your Username"
              className={styles.loginPageUsername}
            />
            <Field
              name="password"
              type="password"
              placeholder="Enter your Password"
              className={styles.loginPagePassword}
            />
            <button type="submit" className={styles.loginButton}>
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                this.setState({ ...this.state, open: true });
              }}
              className={styles.forgotPasswordButton}
            >
              Forgot Password
            </button>

            {/* Forgot Password Div */}
            <Modal
              open={open}
              onClose={() => {
                this.setState({ ...this.state, open: false });
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div>
                  <Formik
                    initialValues={{ email: "" }}
                    onSubmit={(credentials) => {
                      ForgotPasswordHandler(credentials);
                    }}
                  >
                    <Form>
                      <h1>Forgot Password</h1>
                      <Field
                        name="email"
                        type="text"
                        placeholder="Enter your Email"
                      />

                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ border: "none", marginLeft: "1rem" }}
                      >
                        Submit
                      </Button>
                      {/* <button type="submit" className={styles.loginButton}>
                        Submit
                      </button> */}
                      <Button
                        sx={{ border: "none", margin: "1rem" }}
                        variant="contained"
                        onClick={() => {
                          this.setState({ ...this.state, open: false });
                        }}
                      >
                        Close
                      </Button>
                    </Form>
                  </Formik>
                </div>
              </Box>
            </Modal>
          </Form>
        </Formik>
      </div>
    );
  }
}
