const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

// Connect to DB
connectDB();

// CORS configuration
app.use(cors({
    origin: "https://anivarti-admin-panel.onrender.com",  // Frontend URL
    credentials: true,  // Allow credentials (cookies, headers)
}));

// Preflight handler for CORS
app.options('*', cors());

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
