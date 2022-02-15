import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from "./noteService"

// Setup the initial state for tickets and ticket
const initialState = {
	notes: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
}

// Create a function to submit add note action to backend
// export const addNote = createAsyncThunk(
// 	"notes/add",
// 	async (noteData, thunkAPI) => {
// 		// first arg of noteData is coming from ticket form
// 		console.log(noteData)
// 		try {
// 			// get the token from the auth state so we can submit to protected route
// 			const token = thunkAPI.getState().auth.user.token
// 			// pass data and token to the servive
// 			return await noteService.addNote(noteData, token)
// 		} catch (error) {
// 			// console.log(error.response)
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString()
// 			return thunkAPI.rejectWithValue(message)
// 		}
// 	}
// )

// Create a function to submit get notes action to backend
export const getNotes = createAsyncThunk(
	"notes/getAll",
	async (ticketId, thunkAPI) => {
		try {
			// get the token from the auth state so we can submit to protected route
			const token = thunkAPI.getState().auth.user.token
			// pass data and token to the servive
			return await noteService.getNotes(ticketId, token)
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

export const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.notes = action.payload
			})
			.addCase(getNotes.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = noteSlice.actions

export default noteSlice.reducer
