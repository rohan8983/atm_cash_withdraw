import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as atmWithdrawalActions from "../actions";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";

const style = {
  height: 220,
  width: 440,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

class Dashboard extends PureComponent {
  componentDidMount() {
    const id = localStorage.getItem("userId");
    debugger;
    if (id) {
      this.props.action.getCardDetails(id);
    }
  }
  render() {
    return (
      <Paper style={style} zDepth={5} rounded={false}>
        <TextField
          hintText="Enter Withdrawal Amount"
          floatingLabelText="Withdrawal Amount"
          onChange={e =>
            this.props.action.handleOnChange("withdrawalAmt", e.target.value)
          }
          value={this.props.withdrawalAmt}
        />
        <br /> <br />
        <RaisedButton
          label="Withdrawal"
          primary={true}
          style={{ margin: 12 }}
          onClick={() =>
            this.props.action.withdrawal(
              this.props.cardNumber,
              this.props.withdrawalAmt,
              this.props.history
            )
          }
        />
        <Link to="/">
          <RaisedButton
            label="Back"
            secondary={true}
            style={{ margin: 12 }}
            onClick={() => this.props.action.handleCancel()}
          />
        </Link>
        <h3 style={{ color: "red" }}>{this.props.error}</h3>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    withdrawalAmt: state.withdrawalAmt,
    error: state.error,
    cardNumber: state.cardDetails.cardNumber
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
)(Dashboard);
