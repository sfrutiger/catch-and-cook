const mongoose = require("mongoose");

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
    type: String,
  },
  method: {
    type: String,
  },
  details: {
    type: String,
  },
  recipes: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
