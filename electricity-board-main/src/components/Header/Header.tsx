import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Component, Context, ContextType } from "react";
import Modal from "@mui/material/Modal";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { LoginContext } from "../../pages/LoginPage/LoginContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default class Header extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      data: "",
      rows: [],
    };
  }
  static contextType?: Context<any> | undefined = LoginContext;
  context!: ContextType<typeof LoginContext>;
  handleLogout = () => {
    this.context.setUniqueRole("LoginPage");
  };
  render() {
    const { open } = this.state;
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#1B2430" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {this.props.name}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                this.setState({ ...this.state, open: true });
              }}
            >
              Profile
            </Button>
            <Modal
              open={open}
              onClose={() => {
                this.setState({ ...this.state, open: false });
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h1>
                  <EngineeringIcon sx={{ fontSize: 60 }} />
                  Hello, ("Work in Progress !!!")
                  <EngineeringIcon sx={{ fontSize: 60 }} />
                </h1>
              </Box>
            </Modal>
            <Button onClick={() => this.handleLogout()} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
