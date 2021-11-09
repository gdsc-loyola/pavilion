import React from "react";
import { Switch, Route } from "react-router-dom";
import { Admin } from "./Router";
import Dashboard from "../views/Dashboard";
import Events from "../views/Events";
import Login from "../authentication/Login";
import SignUp from "./SelfSignUp/SignUp";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "$lib/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/admin/login/" component={Login} />
        <Route exact path="/admin/signup" component={SignUp} />
        <Admin exact path="/admin/" component={Dashboard} />
        <Admin exact path="/admin/events" component={Events} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
