const Transaction = require("../../models/Transaction");

const storeTransaction = transactionDetails => {
  const newTransaction = new Transaction({
    card: transactionDetails.card._id,
    date: Date.now(),
    deposit: 0,
    withdrawal: transactionDetails.req.body.withdrawalAmt,
    runningBalance:
      transactionDetails.card.balance -
      transactionDetails.req.body.withdrawalAmt
  });
  newTransaction.save().then(transaction => {
    if (transaction) {
      return transactionDetails.res.json({
        status: true,
        msg: "transaction successful",
        notes: transactionDetails.notes
      });
    }
  });
};

module.exports = storeTransaction;
