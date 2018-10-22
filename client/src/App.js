import React, { PureComponent } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CardLogin from "./components/Login/CardLogin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AddCard } from "./components/Login/AddCard";
import Dashboard from "./components/Dashboard/Dashboard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as atmWithdrawalActions from "./components/actions";
import DisplayTransaction from "./components/Dashboard/DisplayTransaction";

class App extends PureComponent {
  componentDidMount() {
    const id = localStorage.getItem("userId");
    debugger;
    if (id) {
      this.props.action.getCardDetails(id);
    }
  }
  render() {
    return (
      <div align="center">
        <h2>ReactJs Sample ATM App</h2>
        <MuiThemeProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={CardLogin} />
              <Route path="/addcard" component={AddCard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/transaction" component={DisplayTransaction} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

//bring all actions
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(atmWithdrawalActions, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
