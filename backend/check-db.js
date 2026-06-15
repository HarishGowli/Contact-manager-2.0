require("dotenv").config();
const mongoose = require("mongoose");

const checkDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_DB);
    
    // Get the current database name
    const dbName = mongoose.connection.db.databaseName;
    console.log(`\n📊 Connected to database: "${dbName}"`);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\n📁 Collections found:");
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Check users count
    const User = require("./models/User");
    const userCount = await User.countDocuments();
    console.log(`\n👥 Users in database: ${userCount}`);
    
    // Check contacts count
    const Contact = require("./models/Contact");
    const contactCount = await Contact.countDocuments();
    console.log(`📞 Contacts in database: ${contactCount}`);
    
    // Show all users (without passwords)
    const users = await User.find().select("-password");
    console.log("\n👤 Users list:");
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - ID: ${user._id}`);
    });
    
    // Show all contacts
    const contacts = await Contact.find().populate("user", "name email");
    console.log("\n📋 Contacts list:");
    contacts.forEach(contact => {
      console.log(`   - ${contact.name} (${contact.email}) - Owner: ${contact.user?.name || "Unknown"}`);
    });
    
    await mongoose.disconnect();
    console.log("\n✅ Check complete!");
    
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

checkDatabase();