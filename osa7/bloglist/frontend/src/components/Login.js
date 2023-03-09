import { useState } from "react"
import Notification from "./Notification"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { loginUser } from "../reducers/userReducer"
import { Form, Button, FormGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogin = async e => {
		e.preventDefault()
		navigate("/")
		try {
			await dispatch(loginUser(username, password))
			setUsername("")
			setPassword("")
			dispatch(createNotification("logged in", "green", 3))
		} catch (error) {
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
			<Form onSubmit={handleLogin} >
				<FormGroup>
					<Form.Label>username:</Form.Label>
					<Form.Control id="username" type="text" name="username" value={username} onChange={handleChange} required  />
					<Form.Label>password</Form.Label>
					<Form.Control id="password" type="password" name="password" value={password} onChange={handleChange} required />
					<Button id="login-button" type="submit" >login</Button>
				</FormGroup>
			</Form>
		</div>
	)
}

export default Login