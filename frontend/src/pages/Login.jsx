import React from "react"
import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const { email, password } = formData

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
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
