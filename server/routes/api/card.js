const express = require("express");
const router = express.Router();
const Card = require("../../models/Card");
const Transaction = require("../../models/Transaction");

//@route GET  /api/card/dashboard/:id
//@desc       Dashboard
//@access     Private
router.get("/dashboard", (req, res) => {
  console.log(req);
});

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
      return res.status(404).json({ cardNumber: "Card is not found" });
    }
    //check pin
    if (req.body.pin !== card.pin) {
      return res.status(400).json({ pin: "pin number is incorrect" });
    }
    res.status(200).json({ msg: "Success", card });
  });
});

//@route GET  /api/card/withdrawal
//@desc       Withdrawal amount from card
//@access     Private
router.put("/withdrawal", (req, res) => {
  if (req.body.withdrawalAmt % 100 === 0) {
    Card.findOne({
      cardNumber: req.body.cardNumber,
      balance: { $gte: req.body.withdrawalAmt }
    }).then(card => {
      if (card && card.balance !== 0) {
        card
          .updateOne({
            balance: card.balance - req.body.withdrawalAmt
          })
          .then(data => {
            if (data.ok) {
              const newTransaction = new Transaction({
                card: card._id,
                date: Date.now(),
                deposit: 0,
                withdrawal: req.body.withdrawalAmt,
                runningBalance: card.balance - req.body.withdrawalAmt
              });
              newTransaction.save().then(transaction => {
                if (transaction) {
                  return res.json({ msg: "transaction successful" });
                }
              });
            }
          });
      } else {
        res.json({ msg: "insuffient balance" });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: "withdrawal amount should be multiple of 100" });
  }
});

module.exports = router;
