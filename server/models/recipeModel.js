const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  author: {
    type: Object,
  },
  pictureDownloadURL: {
    type: String,
  },
  title: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  instructions: {
    type: String,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
