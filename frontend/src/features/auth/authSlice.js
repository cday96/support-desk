import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Setup the initial state for authorization
const initialState = {
	user: null,
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
	}
)

// Create a function to submit login action to backend
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	// first arg of user is coming from login form
	console.log(user)
})

// Export the slice that contains your state and reducers
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
})

// Indicate the reducer to use in app/store.js
export default authSlice.reducer
