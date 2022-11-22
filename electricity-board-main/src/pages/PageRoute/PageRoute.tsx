import { Component } from "react";
import Admin from "../Admin/Admin";
import Agent from "../Agent/Agent";
import LoginPage from "../LoginPage/LoginPage";
import AdminHandelUser from "../../components/AdminPage/AdminHandelUser/AdminHandelUser";
import AdminHandelAgents from "../../components/AdminPage/AdminHandelAgent/AdminHandelAgents";
import AdminHandelMeterType from "../../components/AdminPage/AdminHandelMeterType/AdminHandelMeterType";
import AdminReports from "../../components/AdminPage/AdminReports/AdminReports";
import { Route, Routes } from "react-router-dom";
import { LoginContext } from "../LoginPage/LoginContext";
import AdminHandelDevices from "../../components/AdminPage/AdminHandelDevices/AdminHandelDevices";

export default class PageRoute extends Component<any, any> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     pageRole: "LoginPage",
  //   };
  //   this.setPageRole = this.setPageRole.bind(this);
  // }

  // pageRoute: any = {
  //   LoginPage: <Route path="/" element={<LoginPage />}></Route>,
  //   AdminPage: (
  //     <Route path="/" element={<Admin />}>
  //       <Route index element={<AdminHandelUser />}></Route>
  //       <Route path="handeluser" element={<AdminHandelUser />}></Route>
  //       <Route path="handelagent" element={<AdminHandelAgents />}></Route>
  //       <Route path="metertype" element={<AdminHandelMeterType />}></Route>
  //       <Route path="reports" element={<AdminReports />}></Route>
  //       <Route path="devices" element={<AdminHandelDevices />}></Route>
  //     </Route>
  //   ),
  //   AgentPage: <Route path="/" element={<Agent />}></Route>,
  // };
  // setPageRole(role: string) {
  //   this.setState({ pageRole: role });
  // }

  render() {
    return (
      <div>
        {/* <LoginContext.Provider
          value={{
            setPageRole: this.setPageRole,
          }}
        > */}
        <Routes>
          {/* {this.pageRoute[this.state.pageRole]} */}
          <Route path="/" element={<LoginPage />}></Route>,
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminHandelUser />}></Route>
            <Route path="handeluser" element={<AdminHandelUser />}></Route>
            <Route path="handelagent" element={<AdminHandelAgents />}></Route>
            <Route path="metertype" element={<AdminHandelMeterType />}></Route>
            <Route path="reports" element={<AdminReports />}></Route>
            <Route path="devices" element={<AdminHandelDevices />}></Route>
          </Route>
          <Route path="/agent" element={<Agent />}></Route>
        </Routes>
        {/* </LoginContext.Provider> */}
      </div>
    );
  }
}
