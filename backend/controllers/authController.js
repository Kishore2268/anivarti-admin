const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getCurrentUser = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure that the secret key is stored in your .env file
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);  // Send the user data back
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(500).json({ message: "Server error" });
    }
};
