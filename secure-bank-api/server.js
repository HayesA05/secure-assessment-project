require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();
app.use(express.json());
app.use(helmet());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect("mongodb://127.0.0.1:27017/securebank")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});