const mongoose = require("mongoose");
// import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("DB CONNECTED");
  } catch (err) {
    console.log("DB ERROR MESSAGE:", err.message);
    console.log(err);
  }
};

module.exports = connectDB;
