const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

// @desc Create user
// @route POST /api/users
// @access Private
router.post("/", auth, (req, res) => {
  const user = User.create({
    uid: req.body.uid,
    email: req.body.email,
    displayName: req.body.displayName,
  }).then((post) => res.status(200).json(post));
});

// @desc Get user from uid
// @route GET /api/users
// @access Public
router.get("/", async (req, res) => {
  try {
    const response = await User.find({
      uid: /* req.body.authorUID */ "bJyuB3lvFIXAZrqBSkS65C1idS23",
    });
    res.send(response);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
