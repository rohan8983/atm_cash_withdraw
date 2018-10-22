const Atm = require("../../models/Atm");

const atmWithdrawal = async (balance, withdrawalAmt) => {
  let note2000 = 0,
    note500 = 0,
    note200 = 0,
    note100 = 0,
    currentBalance = balance;
  try {
    const note1 = await Atm.findOne({
      currencyDenomination: 2000,
      count: { $gt: 0 }
    });
    if (withdrawalAmt >= 2000 && note1) {
      note2000 = Math.trunc(withdrawalAmt / 2000);
      currentBalance = currentBalance - note2000 * 2000;
      withdrawalAmt -= note2000 * 2000;
      await Atm.findOneAndUpdate(
        { currencyDenomination: 2000 },
        { $set: { count: note1.count - note2000 } }
      );
    }

    const note2 = await Atm.findOne({
      currencyDenomination: 500,
      count: { $gt: 0 }
    });
    if (withdrawalAmt >= 500 && note2) {
      note500 = Math.trunc(withdrawalAmt / 500);
      currentBalance = currentBalance - note500 * 500;
      withdrawalAmt -= note500 * 500;
      await Atm.findOneAndUpdate(
        { currencyDenomination: 500 },
        { $set: { count: note2.count - note500 } }
      );
    }

    const note3 = await Atm.findOne({
      currencyDenomination: 200,
      count: { $gt: 0 }
    });
    if (withdrawalAmt >= 200 && note3) {
      note200 = Math.trunc(withdrawalAmt / 200);
      currentBalance = currentBalance - note200 * 200;
      withdrawalAmt -= note200 * 200;
      await Atm.findOneAndUpdate(
        { currencyDenomination: 200 },
        { $set: { count: note3.count - note200 } }
      );
    }
    const note4 = await Atm.findOne({
      currencyDenomination: 100,
      count: { $gt: 0 }
    });
    if (withdrawalAmt >= 100 && note4) {
      note100 = Math.trunc(withdrawalAmt / 100);
      currentBalance = currentBalance - note100 * 100;
      withdrawalAmt -= note100 * 100;
      await Atm.findOneAndUpdate(
        { currencyDenomination: 100 },
        { $set: { count: note4.count - note100 } }
      );
    }
    return { note2000, note500, note200, note100, currentBalance };
  } catch (error) {
    console.log(error);
  }
};

module.exports = atmWithdrawal;
