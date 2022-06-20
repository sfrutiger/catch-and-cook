const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  authorUID: {
    type: String,
  },
  pictureDownloadURL: {
    type: String,
  },
  name: {
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
