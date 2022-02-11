import React from "react"
import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const { email, password } = formData

	const navigate = useNavigate()

	// Use dispatch from redux to dispatch to reducer
	const dispatch = useDispatch()

	// Use selector from redux to access items in one of our global states
	const { user, message, isLoading, isSuccess, isError } = useSelector(
		// access the items in our global state -> auth state set in authSlice
		(state) => state.auth
	)

	// useEffect based on redux state brought in with use selector
	useEffect(() => {
		// show message in state if isError state true
		if (isError) {
			toast.error(message)
		}
		// redirect if isSuccess state true and user in state
		if (isSuccess || user) {
			navigate("/")
		}
		// dispath to reset reducer to reset elements of state sans user
		dispatch(reset())
	}, [user, message, isError, isSuccess, navigate, dispatch])

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const userData = {
			email: email,
			password: password,
		}
		// Dispatch the user data to login function in authSlice
		dispatch(login(userData))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login to get support</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							className="form-control"
							id="email"
							type="email"
							value={email}
							onChange={handleChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							id="password"
							type="password"
							value={password}
							onChange={handleChange}
							placeholder="Enter your password"
							required
						/>
					</div>

					<div className="form-group">
						<button className="btn btn-block" type="submit">
							Login
						</button>
					</div>
				</form>
			</section>
		</div>
	)
}

export default Login
