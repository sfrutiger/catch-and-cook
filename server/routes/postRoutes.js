const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/postModel");

// @desc Get posts
// @route GET /api/posts
// @access Public
router.get("/", (req, res) => {
  const posts = Post.find()
    .sort({ _id: -1 })
    .then((posts) => res.status(200).json(posts));
});

// @desc Create post
// @route POST /api/posts
// @access Private
router.post("/", auth, (req, res) => {
  const post = Post.create({
    author: req.body.author,
    pictureDownloadURL: req.body.pictureDownloadURL,
    species: req.body.species,
    date: req.body.date,
    location: req.body.location,
    conditions: req.body.conditions,
    method: req.body.method,
    details: req.body.details,
    recipes: req.body.recipes,
  }).then((post) => res.status(200).json(post));
});

module.exports = router;
