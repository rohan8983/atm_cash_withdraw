const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const atmSchema = Schema({
  currencyDenomination: {
    type: Number
  },
  count: {
    type: Number
  }
});

module.exports = Atm = mongoose.model("atms", atmSchema);
