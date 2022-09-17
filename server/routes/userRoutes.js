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
  }).then((user) => res.status(200).json(user));
});

// @desc Delete user
// @route DELETE /api/posts
// @access Private
router.delete("/:uid", auth, (req, res) => {
  const userToDelete = req.params.uid;
  const decodedTokenUID = res.locals.uid;
  if (userToDelete === decodedTokenUID) {
    User.findOne({ uid: userToDelete })
      .then((user) => user.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  } else {
    console.log("access denied");
  }
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
        const username = req.query.username;
        const response = await User.find({
          username: { $regex: username, $options: "i" },
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
router.patch("/:uid", auth, async (req, res) => {
  const userToUpdate = req.params.uid;
  const decodedTokenUID = res.locals.uid;
  if (userToUpdate === decodedTokenUID) {
    try {
      const result = await User.findOneAndUpdate(
        { uid: decodedTokenUID },
        req.body
      );
      res.send(result);
    } catch (error) {
      res.json({ success: false });
    }
  } else {
    console.log("access denied");
  }
});

module.exports = router;
