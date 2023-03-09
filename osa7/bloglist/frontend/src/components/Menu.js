import { useDispatch, useSelector } from "react-redux"
import { resetUser } from "../reducers/userReducer"
import { createNotification } from "../reducers/notificationReducer"
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, Button } from "react-bootstrap"

const Menu = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)

	const handleLogout = e => {
		e.preventDefault()
		navigate("/")
		window.localStorage.removeItem("loggedUser")
		dispatch(resetUser())
		dispatch(createNotification("logged off", "green", 3))
	}
	
	return ( 
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
				<Nav.Link href="#" as="span">
					<Link to="/">blogs</Link>
				</Nav.Link>
				<Nav.Link href="#" as="span">
					<Link to="/users">users</Link>
				</Nav.Link>
				<Nav.Link href="#" as="span">
					<em>{user.name} logged in</em>
				</Nav.Link>
				{user ? <Button onClick={handleLogout}>logout</Button> : null}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Menu