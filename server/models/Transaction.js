const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = Schema({
  card: {
    type: Schema.Types.ObjectId,
    ref: "cards"
  },
  date: {
    type: Date,
    default: Date.now()
  },
  deposit: {
    type: Number
  },
  withdrawal: {
    type: Number
  },
  runningBalance: {
    type: Number
  }
});

module.exports = Transaction = mongoose.model(
  "transactions",
  transactionSchema
);
