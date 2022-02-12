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

const ticketService = {
	createTicket,
	getTickets,
}

export default ticketService
