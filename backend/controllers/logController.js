const Log = require("../models/Log");

// Get all logs (interactions)
exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find().populate("clientId performedBy", "name email");
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
