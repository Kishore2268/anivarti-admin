const User = require("../models/User");

exports.registerUser = async (req, res) => {
    console.log("Request User:", req.user); // Debug log

    const { name, email, password, role } = req.body;
    const loggedInUserRole = req.user?.role;

    // Check if req.user exists
    if (!loggedInUserRole) {
        return res.status(401).json({ message: "Unauthorized - No User Data" });
    }

    // Role-based restrictions
    if (loggedInUserRole === "manager") {
        return res.status(403).json({ message: "Managers cannot add users" });
    }
    if (loggedInUserRole === "admin" && role === "superadmin") {
        return res.status(403).json({ message: "Admins cannot add superadmins" });
    }

    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Database Save Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    console.log("Request User:", req.user); // Debug log

    const loggedInUserRole = req.user?.role;

    // Check if req.user exists
    if (!loggedInUserRole) {
        return res.status(401).json({ message: "Unauthorized - No User Data" });
    }

    try {
        let users = [];

        if (loggedInUserRole === "superadmin") {
            // Super Admin can see all users
            users = await User.find({});
        } else if (loggedInUserRole === "admin") {
            // Admin can see only Admins and Managers
            users = await User.find({ role: { $in: ["admin", "manager"] } });
        } else if (loggedInUserRole === "manager") {
            // Manager should not see any users
            return res.status(403).json({ message: "Managers are not allowed to view users." });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Database Fetch Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
