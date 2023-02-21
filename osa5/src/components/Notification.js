import PropTypes from "prop-types"

const Notification = ({ notification, notificationColor }) => {
	return (
		<div>
			<p className="notification" id={notificationColor} >{notification}</p>
		</div>
	)
}

Notification.propTypes = {
	notification: PropTypes.string.isRequired,
	notificationColor: PropTypes.string.isRequired
}

export default Notification