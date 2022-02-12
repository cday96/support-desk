import e from "cors"
import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

function NewTicket() {
	// Get the user from the auth state
	const { user } = useSelector((state) => state.auth)

	// Get the needed state from the ticket state
	const { tickets, ticket, message, isLoading, isError, isSuccess } =
		useSelector((state) => state.ticket)

	// Set name and email in component state using the global auth state
	const [name] = useState(user.name)
	const [email] = useState(user.email)

	// Set component state for the rest of the ticket form
	const [product, setProduct] = useState("Campaign Landing Page")
	const [description, setDescription] = useState("")

	const dispatch = useDispatch()

	const navigate = useNavigate()

	// useEffect based on ticket state brought in with useSelector
	useEffect(() => {
		// show message in state if isError state true
		if (isError) {
			toast.error(message)
		}

		// redirect if isSuccess state true and user in state
		if (isSuccess) {
			// dispatch to reset reducer to reset elements of state
			dispatch(reset())
			navigate("/tickets")
		}

		// dispatch to reset reducer to reset elements of state
		dispatch(reset())
	}, [isError, isSuccess, message, navigate, dispatch])

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(createTicket({ product, description }))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div>
			<BackButton url="/" />
			<section className="heading">
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>
			<section className="form">
				<div className="form-group">
					<label htmlFor="name">Customer Name</label>
					<input
						className="formControl"
						type="text"
						value={name}
						disabled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Customer Email</label>
					<input
						className="formControl"
						type="email"
						value={email}
						disabled
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="product">Product</label>
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
						<label htmlFor="description">
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
