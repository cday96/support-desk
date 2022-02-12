import e from "cors"
import React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

function NewTicket() {
	// Get the user from the auth state
	const { user } = useSelector((state) => state.auth)

	// Set name and email in component state using the global auth state
	const [name] = useState(user.name)
	const [email] = useState(user.email)

	// Set component state for the rest of the ticket form
	const [product, setProduct] = useState("Campaign Landing Page")
	const [description, setDescription] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<div>
			<section className="heading">
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>
			<section className="form">
				<div className="form-group">
					<label hmtlFor="name">Customer Name</label>
					<input
						className="formControl"
						type="text"
						value={name}
						disabled
					/>
				</div>
				<div className="form-group">
					<label hmtlFor="email">Customer Email</label>
					<input
						className="formControl"
						type="email"
						value={email}
						disabled
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label hmtlFor="product">Product</label>
						<select
							id="product"
							name="product"
							value={product}
							onChange={(e) => setProduct(e.target.value)}
						>
							<option value="Campaign Landing Page">
								Campaign Landing Page
							</option>
							<option value="Responsive Website">
								Responsive Website
							</option>
							<option value="Basic Ecommerce Website">
								Basic Ecommerce Website
							</option>
							<option value="Social Media Management">
								Social Media Management
							</option>
						</select>
					</div>
					<div className="form-group">
						<label hmtlFor="description">
							Please describe your issue
						</label>
						<textarea
							className="form-control"
							id="description"
							name="description"
							value={description}
							placeholder="Describe the issue..."
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</div>
	)
}

export default NewTicket
