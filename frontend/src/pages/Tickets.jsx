import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"

function Tickets() {
	const { tickets, message, isLoading, isError, isSuccess } = useSelector(
		(state) => state.ticket
	)

	const dispatch = useDispatch()

	// Clear the state on unmount
	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	useEffect(() => {
		dispatch(getTickets())
	}, [dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div>
			<BackButton url="/" />
			<h1>Tickets</h1>
			<div className="tickets">
				<div className="ticket-headings">
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{tickets.map((ticket) => (
					<TicketItem key={ticket._id} ticket={ticket} />
				))}
			</div>
		</div>
	)
}

export default Tickets
