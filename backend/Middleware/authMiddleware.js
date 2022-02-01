const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// Create middleware for protecting private routes
const protect = asyncHandler(async (req, res, next) => {
	let token

	// Check for bearer token in the headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			// Split on space and get token from second position
			token = req.headers.authorization.split(" ")[1]

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// Get user from token sanas the password
			req.user = await User.findById(decoded.id).select("-password")

			// Call whatever next piece of Middleware is
			next()
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error("Not authorized")
		}
	}

	if (!token) {
		res.status(401)
		throw new Error("Not authorized")
	}
})

module.exports = { protect }
