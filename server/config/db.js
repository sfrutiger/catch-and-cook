const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      const connect = await mongoose.connect(process.env.MONGO_URI_DEVELOPMENT);
      console.log(
        `MongoDB connected to development server: ${connect.connection.host}`
          .cyan
      );
    } else if (process.env.NODE_ENV === "production") {
      const connect = await mongoose.connect(process.env.MONGO_URI_PRODUCTION);
      console.log(
        `MongoDB connected to production server: ${connect.connection.host}`
          .cyan
      );
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
