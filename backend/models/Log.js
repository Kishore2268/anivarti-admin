const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    action: { type: String, enum: ["edit", "delete"], required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", LogSchema);
