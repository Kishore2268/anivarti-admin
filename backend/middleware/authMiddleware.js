const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    console.log("Authorization Header:", req.header("Authorization")); // Debug log

    const authHeader = req.header("Authorization");
    if (!authHeader) {
        console.log("No token provided");
        return res.status(401).json({ message: "Access Denied - No Token Provided" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        console.log("Invalid Token Format");
        return res.status(401).json({ message: "Invalid Token Format" });
    }

    const token = tokenParts[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token Verification Error:", err.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;


