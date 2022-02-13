import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketService from "./ticketService"

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"))

// Setup the initial state for tickets and ticket
const initialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
}

// Create a function to submit create ticket action to backend
export const createTicket = createAsyncThunk(
	"tickets/create",
	async (ticketData, thunkAPI) => {
		// first arg of ticketData is coming from ticket form
		console.log(ticketData)
		try {
			// get the token from the auth state so we can submit to protected route
			const token = thunkAPI.getState().auth.user.token
			// pass data and token to the servive
			return await ticketService.createTicket(ticketData, token)
		} catch (error) {
			// console.log(error.response)
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Create a function to submit get user tickets action to backend
export const getTickets = createAsyncThunk(
	"tickets/getAll",
	async (_, thunkAPI) => {
		try {
			// get the token from the auth state so we can submit to protected route
			const token = thunkAPI.getState().auth.user.token
			// pass data and token to the servive
			return await ticketService.getTickets(token)
		} catch (error) {
			// console.log(error.response)
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Create a function to submit get user single ticket action to backend
export const getTicket = createAsyncThunk(
	"tickets/get",
	async (ticketId, thunkAPI) => {
		try {
			// get the token from the auth state so we can submit to protected route
			const token = thunkAPI.getState().auth.user.token
			// pass data and token to the service
			return await ticketService.getTicket(ticketId, token)
		} catch (error) {
			// console.log(error.response)
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Create a function to update user ticket action to backend
export const closeTicket = createAsyncThunk(
	"tickets/close",
	async (ticketId, thunkAPI) => {
		try {
			// get the token from the auth state so we can submit to protected route
			const token = thunkAPI.getState().auth.user.token
			// pass data and token to the service
			return await ticketService.closeTicket(ticketId, token)
		} catch (error) {
			// console.log(error.response)
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Export the slice that contains your state and reducers
export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		// Create a reset action to return everything to initial state
		// This is different than in the authSlice because we dont need to
		// preserve the ticket state like we needed to presrver user state
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		// Use builder to set actions for cases to manage ticket state conditions
		builder
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createTicket.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getTickets.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTickets.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.tickets = action.payload
			})
			.addCase(getTickets.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.ticket = action.payload
			})
			.addCase(getTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(closeTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(closeTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				// If id matches set status to closed in frontend
				state.tickets.map((ticket) =>
					ticket._id === action.payload._id
						? (ticket.status = "Closed")
						: ticket
				)
			})
			.addCase(closeTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

// Export the reset reducer from the ticketSlice actions
export const { reset } = ticketSlice.actions

// Indicate the reducer to use in app/store.js
export default ticketSlice.reducer
