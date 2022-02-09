import axios from "axios"

const API_URL = "http://localhost:5000/api/users/"

// Register user
const register = async (userData) => {
	// Hit the endpoint used for registering users in backend
	const res = await axios.post(API_URL, userData)

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data))
	}
	return res.data
}

// Logout user
const logout = () => localStorage.removeItem("user")

const authService = {
	register,
	logout,
}

export default authService
