import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";

const style = {
  height: 250,
  width: 400,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};
export const CardLogin = () => {
  return (
    <Paper style={style} zDepth={5} rounded={false}>
      <TextField hintText="Card Number" floatingLabelText="Enter Card Number" />
      <br />
      <TextField hintText="Card PIN" floatingLabelText="Enter Card PIN" />
      <br /> <br />
      <RaisedButton label="Submit" primary={true} style={{ margin: 12 }} />
    </Paper>
  );
};
