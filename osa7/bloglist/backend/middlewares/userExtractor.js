const User = require("../models/user")
const jwt = require("jsonwebtoken")

const userExtractor = async (request, response, next) => {
	const authorization = request.get("authorization")
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		const token = authorization.replace("Bearer ", "")
		// eslint-disable-next-line no-undef
		const decodedToken = jwt.verify(token, process.env.SECRET)
		const user = await User.findById(decodedToken.id)
		request.user = user
	}
	next()
}

module.exports = userExtractor