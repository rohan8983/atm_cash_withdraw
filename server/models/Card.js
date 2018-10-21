const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const CardSchema = Schema({
  cardNumber: {
    type: Number,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports = Card = mongoose.model("cards", CardSchema);
