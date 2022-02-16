import React from "react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Modal from "react-modal"
import { FaPlus } from "react-icons/fa"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import {
	getNotes,
	addNote,
	reset as notesReset,
} from "../features/notes/noteSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import NoteItem from "../components/NoteItem"

const customStyles = {
	content: {
		width: "600px",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		position: "relative",
	},
}

Modal.setAppElement("#root")

function Ticket() {
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [noteText, setNoteText] = useState("")
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

	// Submit the note
	const handleNoteSubmit = (e) => {
		e.preventDefault()
		//console.log("sent")
		dispatch(addNote({ noteText, ticketId }))
		closeModal()
	}

	// Open modal when Add Note btn click
	const openModal = () => setModalIsOpen(true)

	// Close modal when close btn is clicked
	const closeModal = () => setModalIsOpen(false)

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

			{ticket.status !== "Closed" && (
				<button className="btn" onClick={openModal}>
					<FaPlus /> Add Note
				</button>
			)}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Add Note"
			>
				<h2>Add Note</h2>
				<button className="btn btn-close" onClick={closeModal}>
					X
				</button>
				<form onSubmit={handleNoteSubmit}>
					<div className="form-group">
						<textarea
							className="form-control"
							id="noteText"
							name="noteText"
							placeholder="Type your note..."
							value={noteText}
							onChange={(e) => setNoteText(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</Modal>

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
