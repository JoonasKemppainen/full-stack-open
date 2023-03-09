import { useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "react-bootstrap"

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility: () => {
				setVisible(!visible)
			}
		}
	})

	const hideWhenVisible = { display: visible ? "none" : "" }
	const showWhenVisible = { display: visible ? "" : "none" }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button id="new-note-button" onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button id="cancel-button" onClick={toggleVisibility}>cancel</Button>
			</div>
			<br />
		</div>
	)
})

export default Togglable