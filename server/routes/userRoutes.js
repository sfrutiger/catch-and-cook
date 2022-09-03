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
    username: req.body.username,
  }).then((post) => res.status(200).json(post));
});

// @desc Get user from criteria
// @route GET /api/users
// @access Public
router.get("/", async (req, res) => {
  try {
    switch (req.query.criteria) {
      case "uid": {
        const response = await User.find({
          uid: req.query.uid,
        });
        res.send(response);
      }
      case "username": {
        const response = await User.find({
          username: req.query.username,
        });
        res.send(response);
      }
    }
  } catch (e) {
    res.status(500).send();
  }
});

// @desc update user
// @route PATCH /api/users
// @access Private
router.patch("/:id", auth, async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(result);
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
