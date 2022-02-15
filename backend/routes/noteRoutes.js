const express = require("express")
// Set property on router so can append /notes onto the tickets URL trunk
const router = express.Router({ mergeParams: true })
const { getNotes, addNote } = require("../controllers/noteController")

// Import Middleware
const { protect } = require("../Middleware/authMiddleware")

// Get the notes for the ticket
router.get("/", protect, getNotes)

// Add a note to a ticket
router.post("/", protect, addNote)

module.exports = router
