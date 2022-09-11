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
    /*     const skip =
      req.query.skip && /^\d+$/.test(req.query.skip)
        ? Number(req.query.skip)
        : 0; */

    let recipeArray = req.query.recipes.split(",");
    const response = await Recipe.find({ _id: { $in: recipeArray } });
    res.send(response);
  } catch (e) {
    res.status(500).send();
  }
});

// @desc Create recipe
// @route POST /api/recipe
// @access Private
router.post("/", auth, (req, res) => {
  const decodedTokenUID = res.locals.uid;
  if (req.body.author === decodedTokenUID) {
    const recipe = Recipe.create({
      authorUID: req.body.author,
      /* pictureDownloadURL: req.body.pictureDownloadURL, */
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    }).then((recipe) => res.status(200).json(recipe));
  } else {
    console.log("access denied");
  }
});

// @desc Delete recipe
// @route DELETE /api/posts
// @access Private
router.delete("/:id", auth, (req, res) => {
  const decodedTokenUID = res.locals.uid;
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (recipe.authorUID === decodedTokenUID) {
        recipe.remove().then(() => res.json({ success: true }));
      } else {
        console.log("access denied");
      }
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @desc Delete all recipes by author
// @route DELETE /api/recipes/accountdeletion
// @access Private
router.delete("/accountdeletion/:uid", auth, async (req, res) => {
  const userToDelete = req.params.uid;
  const decodedTokenUID = res.locals.uid;
  if (userToDelete === decodedTokenUID) {
    try {
      const response = await Recipe.deleteMany({
        authorUID: userToDelete,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("access denied");
  }
});

// @desc update recipe
// @route PATCH /api/recipes
// @access Private
router.patch("/:id", auth, async (req, res) => {
  const decodedTokenUID = res.locals.uid;
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (recipe.authorUID === decodedTokenUID) {
        recipe.updateOne(req.body).then(() => res.json({ success: true }));
      } else {
        console.log("access denied");
      }
    })
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
