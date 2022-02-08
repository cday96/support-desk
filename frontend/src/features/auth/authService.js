import axios from "axios"

const API_URL = "/api/users/"

// Register user
const register = async (userData) => {
	// Hit the endpoint used for registering users in backend
	const res = await axios
		.post(API_URL, userData)
		.then((res) => console.log(res.data))

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data))
	}
	return res.data
}

const authService = {
	register,
}

export default authService
