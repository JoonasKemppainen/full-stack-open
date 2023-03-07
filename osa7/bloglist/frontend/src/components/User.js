const User = ({ user, handleLogout }) => {

	return (
		<div className="user">
			<strong>{user.name}</strong> logged in {" "}
			<button id="logout-button" type="submit" onClick={handleLogout} >logout</button>
		</div>
	)
}

export default User