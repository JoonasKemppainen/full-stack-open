import { useState, useEffect, useRef } from "react"
import Login from "./components/Login"
import User from "./components/User"
import Blogs from "./components/Blogs"
import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"
import Toggleable from "./components/Toggleable"
import blogService from "./services/blogs"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notification, setNotification] = useState(null)
	const [notificationColor, setNotificationColor] = useState("")
	const [user, setUser] = useState(null)
	const CreateBlogRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

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
		setTimeout(() => {
			setNotification("logged out")
			setNotificationColor("red")
			setTimeout(() => {
				setNotification(null)
				setNotificationColor("")
			},3000)
		},50)
	}

	return (
		<div>
			{user === null ?
				<div>
					<Login
						notification={notification}
						setNotification={setNotification}
						notificationColor={notificationColor}
						setNotificationColor={setNotificationColor}
						setUser={setUser} />
				</div>
				:
				<div>
					<h2>blogs</h2>
					<Notification
						notification={notification}
						notificationColor={notificationColor} />
					<User user={user} handleLogout={handleLogout} />
					<br />
					<Toggleable
						buttonLabel="new note"
						ref={CreateBlogRef}>
						<CreateBlog
							blogs={blogs}
							setBlogs={setBlogs}
							setNotification={setNotification}
							setNotificationColor={setNotificationColor}
							setUser={setUser}
							CreateBlogRef={CreateBlogRef} />
					</Toggleable>
					<Blogs
						blogs={blogs}
						setNotification={setNotification}
						setNotificationColor={setNotificationColor}
						setBlogs={setBlogs}
						user={user} />
				</div>
			}
		</div>
	)
}

export default App