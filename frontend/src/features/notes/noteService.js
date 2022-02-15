import axios from "axios"

const API_URL = "http://localhost:5000/api/tickets/"

// Add a note
const addNote = async (noteData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	// Hit the protected endpoint used for creating ticket in backend using the auth config
	const res = await axios.post(API_URL, noteData, config)

	return res.data
}

// Get notes for ticket
const getNotes = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	// Hit the protected endpoint used for creating ticket in backend using the auth config
	const res = await axios.get(API_URL + ticketId + "/notes", config)

	return res.data
}

const noteService = {
	addNote,
	getNotes,
}

export default noteService
