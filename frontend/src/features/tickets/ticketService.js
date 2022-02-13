import axios from "axios"

const API_URL = "http://localhost:5000/api/tickets/"

// Create ticket
const createTicket = async (ticketData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	// Hit the protected endpoint used for creating ticket in backend using the auth config
	const res = await axios.post(API_URL, ticketData, config)

	return res.data
}

// Get user tickets
const getTickets = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	// Hit the protected endpoint used for creating ticket in backend using the auth config
	const res = await axios.get(API_URL, config)

	return res.data
}

// Get user ticket
const getTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	// Hit the protected endpoint used for reading ticket in backend using the auth config
	const res = await axios.get(API_URL + ticketId, config)

	return res.data
}

// Close user ticket
const closeTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	// Hit the protected endpoint used for updatinging ticket in backend using the auth config
	// Only want to update the status so send opject in request with new status value
	const res = await axios.put(
		API_URL + ticketId,
		{ status: "Closed" },
		config
	)

	return res.data
}

const ticketService = {
	createTicket,
	getTickets,
	getTicket,
	closeTicket,
}

export default ticketService
