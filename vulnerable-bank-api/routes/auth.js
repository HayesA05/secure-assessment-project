const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//Register
router.post("/register", async ( req, res) => {
    const { username, password } = req.body;

    const newUser = new User({
        username,
        password //plaintext
    });

    await newUser.save();
    res.json({ message: "User registered" });
});

//Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials"});
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        "supersecretkey" //hardcoded (intentional vulnerability)
    );

    res.json({ token });
});

//Admin Route (Broken Access Control)
router.get("/admin/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;