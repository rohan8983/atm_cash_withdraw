import axios from "axios";

//verify card
export const loginToAccountApi = async (cardNumber, pin) => {
  const card = await axios.post("http://localhost:4000/api/card/login", {
    cardNumber: Number.parseInt(cardNumber),
    pin: Number.parseInt(pin)
  });
  return card;
};

//withdrawal amount
export const withdrawalAmtApi = async (cardNumber, withdrawalAmt) => {
  const transDetails = await axios.put(
    "http://localhost:4000/api/card/withdrawal",
    {
      cardNumber: Number.parseInt(cardNumber),
      withdrawalAmt: Number.parseInt(withdrawalAmt)
    }
  );
  return transDetails;
};

//get Card details
export const getCardDetailsApi = async id => {
  const cardDetails = await axios.post(
    `http://localhost:4000/api/card/carddetails/${id}`
  );
  return cardDetails;
};
