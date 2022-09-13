const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/data", require("./routes/dataRoutes"));

// Accessing the path module
const path = require("path");

if (process.env.NODE_ENV === "production") {
  // Step 1:
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  // Step 2:
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
