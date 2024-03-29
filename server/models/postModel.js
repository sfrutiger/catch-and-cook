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
  time: {
    type: String,
  },
  location: {
    type: Object,
  },
  coordinates: {
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
