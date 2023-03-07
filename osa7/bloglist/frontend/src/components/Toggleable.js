import { useState, forwardRef, useImperativeHandle } from "react"

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
				<button id="new-note-button" onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button id="cancel-button" onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

export default Togglable