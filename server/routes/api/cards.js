const express = require("express");
const router = express.Router();

//@route GET  /api/cards/test
//@desc       Test cards route
//@access     Public
router.get("/test", (req, res) => res.json({ msg: "test works" }));

module.exports = router;
