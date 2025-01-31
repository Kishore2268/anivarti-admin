const express = require("express");
const { login, getCurrentUser } = require("../controllers/authController");

const router = express.Router();
router.post("/login", login);
router.get('/me', getCurrentUser);

module.exports = router;