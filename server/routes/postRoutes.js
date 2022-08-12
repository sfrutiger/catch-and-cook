const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/postModel");

// @desc Get posts
// @route GET /api/posts
// @access Public
// infinite scroll
router.get("/", async (req, res) => {
  try {
    const skip =
      req.query.skip && /^\d+$/.test(req.query.skip)
        ? Number(req.query.skip)
        : 0;

    const userID = req.query.userid ? req.query.userid : { $exists: true };

    const posts = await Post.find({ authorUID: userID }, undefined, {
      skip,
      limit: 3,
    }).sort({
      _id: -1,
    });

    res.send(posts);
  } catch (e) {
    res.status(500).send();
  }
});

// @desc Create post
// @route POST /api/posts
// @access Private
router.post("/", auth, (req, res) => {
  const post = Post.create({
    authorUID: req.body.authorUID,
    pictureDownloadURL: req.body.pictureDownloadURL,
    species: req.body.species,
    date: req.body.date,
    location: req.body.location,
    conditions: req.body.conditions,
    method: req.body.method,
    recipes: req.body.recipes,
  }).then((post) => res.status(200).json(post));
});

// @desc Delete post
// @route DELETE /api/posts
// @access Private
router.delete("/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => post.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
