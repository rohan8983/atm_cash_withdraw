import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { CardLogin } from "./CardLogin";
import { BrowserRouter, Route } from "react-router-dom";

export const App = () => {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <Route path="/" component={CardLogin} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};
