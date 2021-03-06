import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)

	const handleLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate("/")
	}

	return (
		<header className="header">
			<div className="logo">
				<Link to="/">Support Desk</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className="btn" onClick={handleLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<div>
						<li>
							<Link to="/login">
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to="/register">
								<FaUser /> Register
							</Link>
						</li>
					</div>
				)}
			</ul>
		</header>
	)
}

export default Header
