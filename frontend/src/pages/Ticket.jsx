import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, reset as notesReset } from "../features/notes/noteSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import NoteItem from "../components/NoteItem"

function Ticket() {
	const { ticket, message, isLoading, isSuccess, isError } = useSelector(
		(state) => state.ticket
	)

	const { notes, isLoading: notesIsLoading } = useSelector(
		(state) => state.note
	)

	const navigate = useNavigate()

	// Need to get ticket id from the params so need to useParams
	const params = useParams()

	const { ticketId } = useParams()

	// console.log(ticketId)

	const dispatch = useDispatch()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		dispatch(getTicket(ticketId))
		dispatch(getNotes(ticketId))
		// eslint-disable-next-line
	}, [isError, message, ticketId])

	// Close the ticket when Close Ticket btn clicked
	const handleCloseTicket = () => {
		dispatch(closeTicket(ticketId))
		toast.success("TicketClosed")
		navigate("/tickets")
	}

	if (isLoading || notesIsLoading) {
		return <Spinner />
	}

	if (isError) {
		;<h3>Something Went Wrong...</h3>
	}

	return (
		<div className="ticket-page">
			<header className="ticket-header">
				<BackButton url="/tickets" />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>Product: {ticket.product}</h3>
				<h4>
					Date Submitted:{" "}
					{new Date(ticket.createdAt).toLocaleString("en-US")}
				</h4>
				<hr />
				<div className="ticket-desc">
					<h3>Description of Issue:</h3>
					<p>{ticket.description}</p>
				</div>
				<h2>Notes:</h2>
			</header>

			{notes.map((note) => (
				<NoteItem key={note._id} note={note} />
			))}

			{ticket.status !== "Closed" && (
				<button
					className="btn btn-block btn-danger"
					onClick={handleCloseTicket}
				>
					Close Ticket
				</button>
			)}
		</div>
	)
}

export default Ticket
