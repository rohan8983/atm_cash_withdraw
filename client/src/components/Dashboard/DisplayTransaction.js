import React from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import Paper from "material-ui/Paper";

const style = {
  height: 280,
  width: 400,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

const DisplayTransaction = props => {
  return (
    <Paper style={style} zDepth={5} rounded={false}>
      <br />
      <label>
        <b>New Balance : </b>
      </label>
      <span>{props.currentBalance}</span>
      <h3>Notes : </h3>
      {props.note2000 !== 0 ? (
        <div>
          <label>2000 * </label>
          <span>{props.note2000}</span>
        </div>
      ) : null}
      <br />
      {props.note500 !== 0 ? (
        <div>
          <label>500 * </label>
          <span>{props.note500}</span>
        </div>
      ) : null}
      <br />
      {props.note200 !== 0 ? (
        <div>
          <label>200 * </label>
          <span>{props.note200}</span>
        </div>
      ) : null}
      <br />
      {props.note100 !== 0 ? (
        <div>
          <label>100 * </label>
          <span>{props.note100}</span>
        </div>
      ) : null}
      <br />
      <Link to="/dashboard">
        <RaisedButton
          label="Back"
          secondary={true}
          style={{ margin: 12 }}
          onClick={localStorage.removeItem("userId")}
        />
      </Link>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    currentBalance: state.withdrawalAmtDetails.currentBalance,
    note2000: state.withdrawalAmtDetails.note2000,
    note500: state.withdrawalAmtDetails.note500,
    note200: state.withdrawalAmtDetails.note200,
    note100: state.withdrawalAmtDetails.note100
  };
};
export default connect(
  mapStateToProps,
  null
)(DisplayTransaction);
