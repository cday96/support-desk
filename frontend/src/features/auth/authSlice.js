import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"))

// Setup the initial state for authorization
const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
}

// Create a function to submit register action to backend
export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		// first arg of user is coming from register form
		console.log(user)
		try {
			return await authService.register(user)
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

// Create a function to submit login action to backend
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	// first arg of user is coming from login form
	console.log(user)
})

// Create function to logout user
export const logout = createAsyncThunk("auth/logout", async () => {
	await authService.logout()
})

// Export the slice that contains your state and reducers
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// create a reset action
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ""
		},
	},
	extraReducers: (builder) => {
		// Use builder to set actions for cases to manage register state conditions
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
			})
	},
})

// Export the reset reducer from the authSlice actions
export const { reset } = authSlice.actions

// Indicate the reducer to use in app/store.js
export default authSlice.reducer
