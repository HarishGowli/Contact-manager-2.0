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
      console.error("❌ Database URL is undefined. Check your .env file!");
      console.error("NODE_ENV:", process.env.NODE_ENV);
      console.error("MONGO_DB_PROD exists?", !!process.env.MONGO_DB_PROD);
      console.error("MONGO_DB_LOCAL exists?", !!process.env.MONGO_DB_LOCAL);
      return;
    }
    
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log(`✅ DB CONNECTED - ${process.env.NODE_ENV === "production" ? "PRODUCTION" : "LOCAL"}`);
  } catch (err) {
    console.log("❌ DB ERROR MESSAGE:", err.message);
    console.log(err);
  }
};

module.exports = connectDB;