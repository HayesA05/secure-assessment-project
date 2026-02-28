/*Vulnerable User Model*/
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String, //Plaintext (baseline vulnerability)
    role: { type: String, Default: "user" },
    balance: { type: Number, default: 1000 }
});

module.exports = mongoose.model("User", userSchema);