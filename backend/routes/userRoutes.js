const express = require("express");
const { registerUser, getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/register", authMiddleware, registerUser);
router.get("/", authMiddleware, getAllUsers);

module.exports = router;