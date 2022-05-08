const asyncHandler = require("express-async-handler");

// @desc Create user
// @route POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create user" });
});

module.exports = {
  createUser,
};
