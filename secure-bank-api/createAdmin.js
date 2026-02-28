require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/securebank")
  .then(async () => {
    console.log("MongoDB Connected");

    // Hash the password
    const hashedPassword = await bcrypt.hash("Password", 10);

    // Create the admin user
    const admin = new User({
      username: "admin",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin user created successfully!");

    mongoose.disconnect();
  })
  .catch(err => console.log(err));