import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)

	// Look for the user in the auth state from redux
	const { user } = useSelector((state) => state.auth)

	// Set the logged in status when user changes in the state
	useEffect(() => {
		if (user) {
			setLoggedIn(true)
		} else {
			setLoggedIn(false)
		}
		setCheckingStatus(false)
	}, [user])

	return { loggedIn, checkingStatus }
}
