require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/vulnerablebank")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});