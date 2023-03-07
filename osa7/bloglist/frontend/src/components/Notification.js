import { useSelector } from "react-redux"

const Notification = () => {
	const {message, color} = useSelector((state) => state.notification)

	return (
		<div>
			<p className="notification" id={color}>{message}</p>
		</div>
	)
}

export default Notification