import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as atmWithdrawalActions from "../actions";

const style = {
  height: 290,
  width: 400,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};
const CardLogin = props => {
  return (
    <Paper style={style} zDepth={5} rounded={false}>
      <TextField
        hintText="Card Number"
        floatingLabelText="Enter Card Number"
        onChange={e =>
          props.action.handleOnChange("cardNumber", e.target.value)
        }
        value={props.cardNumber}
      />
      <br />
      <TextField
        type="password"
        hintText="Card PIN"
        floatingLabelText="Enter Card PIN"
        onChange={e => props.action.handleOnChange("pin", e.target.value)}
        value={props.pin}
      />
      <br /> <br />
      <RaisedButton
        label="Submit"
        primary={true}
        style={{ margin: 12 }}
        onClick={() => {
          props.action.submitCard(props.cardNumber, props.pin, props.history);
        }}
      />
      <h3 style={{ color: "red" }}>{props.error}</h3>
    </Paper>
  );
};

//bring required data from redux store
const mapStateToProps = state => {
  return {
    cardNumber: state.cardNumber,
    pin: state.pin,
    error: state.error
  };
};

//bring all actions
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(atmWithdrawalActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardLogin);
