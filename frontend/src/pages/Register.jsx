import React from "react"
import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	})

	const { name, email, password, password2 } = formData

	const navigate = useNavigate()

	// Use dispatch from redux to dispatch to reducer
	const dispatch = useDispatch()

	// Use selector from redux to access items in one of our global states
	const { user, message, isLoading, isSuccess, isError } = useSelector(
		// access the items in our global state -> auth state set in authSlice
		(state) => state.auth
	)

	// useEffect based on redu state brought in with useSelector
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
	}, [isError, isSuccess, user, message, navigate, dispatch])

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (password !== password2) {
			toast.error("Passwords must match")
		} else {
			const userData = {
				name: name,
				email: email,
				password: password,
			}
			// Dispatch the user data to register function in authSlice
			dispatch(register(userData))
		}
	}

	return (
		<div>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							className="form-control"
							id="name"
							type="text"
							value={name}
							onChange={handleChange}
							placeholder="Enter your name"
							required
						/>
					</div>
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
						<input
							className="form-control"
							id="password2"
							type="password"
							value={password2}
							onChange={handleChange}
							placeholder="Confirm password"
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block" type="submit">
							Register
						</button>
					</div>
				</form>
			</section>
		</div>
	)
}

export default Register
