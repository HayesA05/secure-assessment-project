const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // hashed in secure version
  role: { type: String, default: "user" },
  balance: { type: Number, default: 1000 }
});

module.exports = mongoose.model("User", userSchema);