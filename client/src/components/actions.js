import {
  loginToAccountApi,
  withdrawalAmtApi,
  getCardDetailsApi
} from "./service";
// import { push } from "react-router-redux";

export const handleOnChange = (valueType, value) => ({
  type: "HANDLE_ON_CHANGE",
  valueType,
  value
});
const setCardDetails = card => ({
  type: "SET_CARD_DETAILS",
  card
});
const setError = error => ({
  type: "SET_ERROR",
  error
});

const setTransactionDetails = transaction => ({
  type: "SET_TRANSACTION_DETAILS",
  transaction
});

export const handleCancel = () => ({
  type: "HANDLE_CANCEL"
});

//action for verify card
export const submitCard = (cardNumber, pin, history) => {
  return async dispatch => {
    try {
      const card = await loginToAccountApi(cardNumber, pin);
      if (card.data.status) {
        dispatch(setCardDetails(card.data.result));
        localStorage.setItem("userId", card.data.result._id);
        history.push("/dashboard");
      } else {
        dispatch(setError(card.data.msg));
      }
    } catch (error) {
      throw new Error("Error while login with card :" + error);
    }
  };
};

//action for withdrawal amount
export const withdrawal = (cardNumber, withdrawalAmt, history) => {
  return async dispatch => {
    try {
      const card = await withdrawalAmtApi(cardNumber, withdrawalAmt);
      if (card.data.status) {
        dispatch(setTransactionDetails(card.data.notes));
        history.push("/transaction");
      } else {
        dispatch(setError(card.data.msg));
      }
    } catch (error) {
      throw new Error("Error while withdrawal amount :" + error);
    }
  };
};

//get card details
export const getCardDetails = id => {
  return async dispatch => {
    try {
      const card = await getCardDetailsApi(id);
      if (card.data.status) {
        dispatch(setCardDetails(card.data.card));
      } else {
        dispatch(setError(card.data.msg));
      }
    } catch (error) {
      throw new Error("Error in getCard :" + error);
    }
  };
};
