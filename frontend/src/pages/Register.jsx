import React from "react"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	})

	const { name, email, password, password2 } = formData

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
							type="password2"
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
