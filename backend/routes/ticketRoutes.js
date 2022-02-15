const express = require("express")
const router = express.Router()
const {
	createTicket,
	getTickets,
	getTicket,
	updateTicket,
	deleteTicket,
} = require("../controllers/ticketController")

// Import Middleware
const { protect } = require("../Middleware/authMiddleware")

// Re-route into noteRouter so we can append it onto the needed ticket route
const noteRouter = require("./noteRoutes")
router.use("/:ticketId/notes", noteRouter)

// Set up ticket routes
// Allow user to create a ticket
router.post("/", protect, createTicket)

// Get the current user's tickets
router.get("/", protect, getTickets)

// Get a single ticket for user
router.get("/:id", protect, getTicket)

// Update ticket
router.put("/:id", protect, updateTicket)

// Delete ticket
router.delete("/:id", protect, deleteTicket)

module.exports = router
