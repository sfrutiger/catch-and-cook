const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

// @desc Create post
// @route POST /api/posts
// @access Private
router.post("/", auth, (req, res) => {
  const user = User.create({
    uid: req.body.uid,
    email: req.body.email,
    displayName: req.body.displayName,
  }).then((post) => res.status(200).json(post));
});

module.exports = router;
