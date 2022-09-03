const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uid: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
