import { useState } from "react"
import Notification from "./Notification"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Login = ({
	notification,
	setNotification,
	notificationColor,
	setNotificationColor,
	setUser
}) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async e => {
		e.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem("loggedUser", JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername("")
			setPassword("")
			setTimeout(() => {
				setNotification("logged in")
				setNotificationColor("green")
				setTimeout(() => {
					setNotification(null)
					setNotificationColor("")
				},3000)
			},50)
		} catch (error) {
			console.log(error)
			setNotificationColor("red")
			setNotification("invalid username or password")
			setTimeout(() => {
				setNotification(null)
				setNotificationColor("")
			}, 3000)
		}
	}

	const handleChange = e => {
		if (e.target.name === "username") setUsername(e.target.value)
		if (e.target.name === "password") setPassword(e.target.value)
	}

	return (
		<div>
			<h2>log in to application</h2>
			<Notification notification={notification} notificationColor={notificationColor} />
			<form onSubmit={handleLogin} >
				<table>
					<tbody>
						<tr>
							<td>username:</td>
							<td><input type="text" name="username" value={username} onChange={handleChange} required /></td>
						</tr>
						<tr>
							<td>password:</td>
							<td><input type="password" name="password" value={password} onChange={handleChange} required /></td>
						</tr>
					</tbody>
				</table>
				<button type="submit" >login</button>
			</form>
		</div>
	)
}

Login.propTypes = {
	notification: PropTypes.string.isRequired,
	setNotification: PropTypes.func.isRequired,
	notificationColor: PropTypes.string.isRequired,
	setNotificationColor: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired
}

export default Login