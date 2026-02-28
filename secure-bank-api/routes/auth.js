const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// -------------------------
// REGISTER
// -------------------------
router.post(
  "/register",
  // simple input validation
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "User registered" });
  }
);

// -------------------------
// LOGIN
// -------------------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // compare password with hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  // sign JWT using .env secret
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// -------------------------
// UPDATE USER (Admin Only)
// -------------------------
router.put("/admin/users/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { username, role } = req.body;

  // simple validation
  if (username && username.length < 3) {
    return res.status(400).json({ message: "Username must be at least 3 characters" });
  }
  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Role must be 'user' or 'admin'" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...(username && { username }), ...(role && { role }) },
      { new: true, runValidators: true }
    ).select("-password"); // hide password

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// DELETE USER (Admin Only)
// -------------------------
router.delete("/admin/users/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// -------------------------
// ADMIN ROUTE (Protected)
// -------------------------
router.get("/admin/users", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.find().select("-password"); // hide hashed passwords
  res.json(users);
});

module.exports = router;