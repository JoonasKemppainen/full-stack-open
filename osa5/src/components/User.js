import PropTypes from "prop-types"

const User = ({ user, handleLogout }) => {

	return (
		<div className="user">
			<strong>{user.name}</strong> logged in {" "}
			<button id="logout-button" type="submit" onClick={handleLogout} >logout</button>
		</div>
	)
}

User.propTypes = {
	user: PropTypes.object.isRequired,
	handleLogout: PropTypes.func.isRequired
}

export default User