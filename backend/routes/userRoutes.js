const express = require("express")
const router = express.Router()
const {
	registerUser,
	loginUser,
	getMe,
} = require("../controllers/userController")

// Import Middleware
const { protect } = require("../Middleware/authMiddleware")

// Route to register using register user controller
router.post("/", registerUser)

// Route to login using login user controller
router.post("/login", loginUser)

// Protected Route to current user with get me controller
router.get("/me", protect, getMe)

module.exports = router
