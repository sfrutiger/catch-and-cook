const mongoose = require("mongoose");
const recipeSchema = require("./recipeModel");

const postSchema = mongoose.Schema({
  authorUID: {
    type: String,
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
  shareCoordinates: {
    type: Boolean,
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
