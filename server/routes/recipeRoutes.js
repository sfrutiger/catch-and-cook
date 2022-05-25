const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Recipe = require("../models/recipeModel");

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

    const recipes = await Recipe.find({}, undefined, { skip, limit: 3 }).sort({
      _id: -1,
    });

    res.send(recipes);
  } catch (e) {
    res.status(500).send();
  }
});

// @desc Create recipe
// @route POST /api/recipe
// @access Private
router.post("/", auth, (req, res) => {
  const recipe = Recipe.create({
    author: req.body.author,
    pictureDownloadURL: req.body.pictureDownloadURL,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  }).then((recipe) => res.status(200).json(recipe));
});

module.exports = router;
