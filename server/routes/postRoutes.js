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
  const decodedTokenUID = res.locals.uid;
  if (req.body.authorUID === decodedTokenUID) {
    const post = Post.create({
      authorUID: req.body.authorUID,
      pictureDownloadURL: req.body.pictureDownloadURL,
      species: req.body.species,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      coordinates: req.body.coordinates,
      shareCoordinates: req.body.shareCoordinates,
      conditions: req.body.conditions,
      method: req.body.method,
      recipes: req.body.recipes,
    }).then((post) => res.status(200).json(post));
  } else {
    console.log("access denied");
  }
});

// @desc Delete post
// @route DELETE /api/posts
// @access Private
router.delete("/:id", auth, (req, res) => {
  const decodedTokenUID = res.locals.uid;
  Post.findById(req.params.id)
    .then((post) => {
      if (post.authorUID === decodedTokenUID) {
        post.remove().then(() => res.json({ success: true }));
      } else {
        console.log("access denied");
      }
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @desc Delete all posts by author
// @route DELETE /api/posts/accountdeletion
// @access Private
router.delete("/accountdeletion/:uid", auth, async (req, res) => {
  const decodedTokenUID = res.locals.uid;
  const userToDelete = req.params.uid;
  if (userToDelete === decodedTokenUID) {
    try {
      const response = await Post.deleteMany({
        authorUID: userToDelete,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("access denied");
  }
});

// @desc update post
// @route PATCH /api/posts
// @access Private
router.patch("/:id", auth, async (req, res) => {
  const decodedTokenUID = res.locals.uid;
  Post.findById(req.params.id)
    .then((post) => {
      if (post.authorUID === decodedTokenUID) {
        post.updateOne(req.body).then(() => res.json({ success: true }));
      } else {
        console.log("access denied");
      }
    })
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
