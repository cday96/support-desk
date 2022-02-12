const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")

// @desc   Allow user to create ticket
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
	// destructure to get the product and description data from the post request
	const { product, description } = req.body

	if (!product || !description) {
		res.status(400)
		throw new Error("Please select and product and description")
	}

	// Get user object using id and jwt
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const ticket = await Ticket.create({
		product: product,
		description: description,
		user: req.user.id,
		status: "New",
	})

	res.status(201).json(ticket)
})

// @desc   Controller for getting user's tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
	// Get user object using id and jwt
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const tickets = await Ticket.find({ user: req.user.id })

	res.status(200).json(tickets)
})

// @desc   Controller for getting single user ticket
// @route  GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
	// Get user object using id and jwt
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const ticket = await Ticket.findById(req.params.id)

	if (!ticket) {
		res.status(404)
		throw new Error("Ticket not found")
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("Not authorized")
	}

	res.status(200).json(ticket)
})

// @desc   Controller for updating a ticket
// @route  PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
	// Get user object using id and jwt
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const ticket = await Ticket.findById(req.params.id)

	if (!ticket) {
		res.status(404)
		throw new Error("Ticket not found")
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("Not authorized")
	}

	const updatedTicket = await Ticket.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)

	res.status(200).json(updatedTicket)
})

// @desc   Controller for deleting a ticket
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
	// Get user object using id and jwt
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const ticket = await Ticket.findById(req.params.id)

	if (!ticket) {
		res.status(404)
		throw new Error("Ticket not found")
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("Not authorized")
	}

	await ticket.remove()

	res.status(200).json({ success: true })
})

module.exports = {
	createTicket,
	getTickets,
	getTicket,
	deleteTicket,
	updateTicket,
}
