const initialState = {
  cardNumber: "",
  pin: "",
  cardDetails: {},
  error: "",
  withdrawalAmt: "",
  withdrawalAmtDetails: {
    currentBalance: 0,
    note2000: 0,
    note500: 0,
    note200: 0,
    note100: 0
  }
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_ON_CHANGE":
      return {
        ...state,
        [action.valueType]: action.value,
        error: ""
      };
    case "SET_CARD_DETAILS":
      return {
        ...state,
        cardDetails: action.card
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "SET_TRANSACTION_DETAILS":
      return {
        ...state,
        withdrawalAmtDetails: {
          ...state.withdrawalAmtDetails,
          currentBalance: action.transaction.currentBalance,
          note2000: action.transaction.note2000,
          note500: action.transaction.note500,
          note200: action.transaction.note200,
          note100: action.transaction.note100
        }
      };
    case "HANDLE_CANCEL":
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
};
