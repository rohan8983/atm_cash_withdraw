import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";

const style = {
  height: 320,
  width: 400,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};
export const AddCard = props => {
  return (
    <Paper style={style} zDepth={5} rounded={false}>
      <TextField hintText="Card Number" floatingLabelText="Enter Card Number" />
      <br />
      <TextField hintText="Card PIN" floatingLabelText="Enter Card PIN" />
      <br />
      <TextField
        hintText="Card Balance"
        floatingLabelText="Enter Card Balance"
      />
      <br /> <br />
      <Link to="/">
        <RaisedButton label="Cancle" primary={true} style={{ margin: 12 }} />
      </Link>
      <Link to="/">
        <RaisedButton
          label="Add Card"
          secondary={true}
          style={{ margin: 12 }}
        />
      </Link>
    </Paper>
  );
};
