const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")
const Note = require("../models/noteModel")

// @desc   Controller for getting notes for a ticket
// @route  GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
	// Get user object using id and jwt
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	// Get the ticketId for the ticket from the params
	const ticket = await Ticket.findById(req.params.ticketId)

	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("User not authorized")
	}

	// Get the notes for the ticket
	const notes = await Note.find({ ticket: req.params.ticketId })

	res.status(200).json(notes)
})

// @desc   Controller for adding notes to a ticket
// @route  PUT /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
	// Get user object using id and jwt
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	// Get the ticketId for the ticket from the params
	const ticket = await Ticket.findById(req.params.ticketId)

	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("User not authorized")
	}

	// Add the note to the ticket
	const note = await Note.create({
		text: req.body.text,
		user: req.user.id,
		ticket: req.params.ticketId,
	})

	res.status(200).json(note)
})

module.exports = {
	getNotes,
	addNote,
}
