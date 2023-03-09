import { useDispatch, useSelector } from "react-redux"
import { resetUser } from "../reducers/userReducer"
import { createNotification } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"

const Menu = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	const handleLogout = e => {
		e.preventDefault()
		window.localStorage.removeItem("loggedUser")
		dispatch(resetUser())
		dispatch(createNotification("logged off", "green", 3))
	}

	return (
		<div>
			<Link to="/">blogs</Link>
			<Link to="/users">users</Link>
			{user.name} logged in
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default Menu