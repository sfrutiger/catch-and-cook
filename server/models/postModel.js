const mongoose = require("mongoose");
const recipeSchema = require("./recipeModel");

const postSchema = mongoose.Schema({
  author: {
    type: Object,
  },
  pictureDownloadURL: {
    type: String,
  },
  species: {
    type: String,
  },
  date: {
    type: String,
  },
  location: {
    type: Array,
  },
  conditions: {
    type: Object,
  },
  method: {
    type: String,
  },
  recipes: {
    type: Array,
  },
});

module.exports = mongoose.model("Post", postSchema);
