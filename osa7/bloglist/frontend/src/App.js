import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import Login from "./components/Login"
import User from "./components/User"
import Blogs from "./components/Blogs"
import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"
import Toggleable from "./components/Toggleable"
import blogService from "./services/blogs"
import { createNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"

const App = () => {
	const [user, setUser] = useState(null)
	const CreateBlogRef = useRef()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogout = e => {
		e.preventDefault()
		window.localStorage.removeItem("loggedUser")
		setUser(null)
		dispatch(createNotification("logged off", "green", 3))
	}

	return (
		<div>
			{user === null ?
				<div>
					<Login
						setUser={setUser} />
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
							setUser={setUser}
							CreateBlogRef={CreateBlogRef} />
					</Toggleable>
					<Blogs
						user={user} />
				</div>
			}
		</div>
	)
}

export default App