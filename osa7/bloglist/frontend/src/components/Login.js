import { useState } from "react"
import Notification from "./Notification"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"

const Login = ({setUser}) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()

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
			dispatch(createNotification("logged in", "green", 3))
		} catch (error) {
			console.log(error)
			dispatch(createNotification("invalid username of password", "red", 3))
		}
	}

	const handleChange = e => {
		if (e.target.name === "username") setUsername(e.target.value)
		if (e.target.name === "password") setPassword(e.target.value)
	}

	return (
		<div>
			<h2>log in to application</h2>
			<Notification />
			<form onSubmit={handleLogin} >
				<table>
					<tbody>
						<tr>
							<td>username:</td>
							<td><input id="username" type="text" name="username" value={username} onChange={handleChange} required /></td>
						</tr>
						<tr>
							<td>password:</td>
							<td><input id="password" type="password" name="password" value={password} onChange={handleChange} required /></td>
						</tr>
					</tbody>
				</table>
				<button id="login-button" type="submit" >login</button>
			</form>
		</div>
	)
}

export default Login