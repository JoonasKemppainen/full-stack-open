import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import Login from "./components/Login"
import User from "./components/User"
import Blogs from "./components/Blogs"
import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"
import Toggleable from "./components/Toggleable"
import { createNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser, resetUser } from "./reducers/userReducer"
import { initializeUsers } from "./reducers/usersReducer"
import { useSelector } from "react-redux"

const App = () => {
	const CreateBlogRef = useRef()

	const user = useSelector((state) => state.user)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUser())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	const handleLogout = e => {
		e.preventDefault()
		window.localStorage.removeItem("loggedUser")
		dispatch(resetUser())
		dispatch(createNotification("logged off", "green", 3))
	}

	return (
		<div>
			{!user ?
				<div>
					<Login />
				</div>
				:
				<div>
					<h2>blogs</h2>
					<Notification />
					<User user={user} handleLogout={handleLogout} />
					<br />
					<Toggleable
						buttonLabel="new note"
						ref={CreateBlogRef}>
						<CreateBlog
							CreateBlogRef={CreateBlogRef} />
					</Toggleable>
					<Blogs />
				</div>
			}
		</div>
	)
}

export default App