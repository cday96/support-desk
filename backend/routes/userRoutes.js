const express = require("express")
const router = express.Router()
const { registerUser, loginUser } = require("../controllers/userController")

// Route to register using register user controller
router.post("/", registerUser)

// Route to login using login user controller
router.post("/login", loginUser)

module.exports = router
