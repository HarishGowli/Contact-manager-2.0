const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Choose database based on environment
    let dbUrl;
    
    if (process.env.NODE_ENV === "production") {
      dbUrl = process.env.MONGO_DB_PROD;
      console.log("Connecting to PRODUCTION database (Atlas)...");
    } else {
      dbUrl = process.env.MONGO_DB_LOCAL;
      console.log("Connecting to LOCAL database...");
    }
    
    if (!dbUrl) {
      throw new Error("Database URL is undefined. Check your .env file!");
    }
    
    await mongoose.connect(dbUrl);
    console.log(`DB CONNECTED - ${process.env.NODE_ENV === "production" ? "PRODUCTION" : "LOCAL"}`);
  } catch (err) {
    console.log("DB ERROR MESSAGE:", err.message);
    console.log(err);
    
    // Don't exit the process in production
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;