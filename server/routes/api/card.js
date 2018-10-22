const express = require("express");
const router = express.Router();
const Card = require("../../models/Card");
const atmWithdrawal = require("../api/atm");
const storeTransaction = require("../api/transaction");

//@route GET  /api/card/add_card
//@desc       add new card
//@access     Public
router.post("/add_card", (req, res) => {
  try {
    Card.findOne({ cardNumber: req.body.cardNumber }).then(card => {
      if (card) {
        return res.status(400).json({ cardNumber: "card is already exists" });
      } else {
        const newCard = new Card({
          cardNumber: req.body.cardNumber,
          pin: req.body.pin,
          balance: req.body.balance
        });
        newCard
          .save()
          .then(card => {
            res.status(200).json(card);
          })
          .catch(err => console.log(err));
      }
    });
  } catch (error) {
    console.log("Error while save card", error);
  }
});

//@route GET  /api/card
//@desc       Check entered card or pin is valid or not
//@access     Private
router.post("/login", (req, res) => {
  //find card
  Card.findOne({ cardNumber: req.body.cardNumber }).then(card => {
    //check card
    if (!card) {
      return res.json({ status: false, msg: "Card is not found " });
    }
    //check pin
    if (req.body.pin !== card.pin) {
      return res.json({ status: false, msg: "Pin number is incorrect" });
    }
    res.status(200).json({
      msg: "Success",
      status: true,
      result: {
        _id: card._id,
        cardNumber: card.cardNumber,
        balance: card.balance
      }
    });
  });
});

//@route GET  /api/card/withdrawal
// @desc       Withdrawal amount from card and update atm cash
//             count and store transaction history
//@access     Private
router.put("/withdrawal", (req, res) => {
  if (req.body.withdrawalAmt % 100 === 0) {
    Card.findOne({
      cardNumber: req.body.cardNumber,
      balance: { $gte: req.body.withdrawalAmt }
    }).then(async card => {
      if (card && card.balance !== 0) {
        //update atm and get cash
        const notes = await atmWithdrawal(card.balance, req.body.withdrawalAmt);
        card
          .updateOne({
            balance: card.balance - req.body.withdrawalAmt
          })
          .then(data => {
            if (data.ok) {
              //store transactions details in DB
              const transactionsDetails = { card, req, res, notes };
              storeTransaction(transactionsDetails);
            }
          });
      } else {
        res.json({ msg: "insuffient balance", status: false });
      }
    });
  } else {
    res.json({
      msg: "withdrawal amount should be multiple of 100",
      status: false
    });
  }
});

//get card details
router.post("/carddetails/:id", (req, res) => {
  if (req.params.id) {
    Card.findOne({ _id: req.params.id })
      .then(card => res.json({ status: true, card }))
      .catch(error => res.json({ msg: "Error", status: false }));
  }
});

module.exports = router;
