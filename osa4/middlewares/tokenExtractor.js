const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization")
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request.token = authorization.replace("Bearer ", "")
	} else {
		request.token = null
	}
	next()
}
  
module.exports = tokenExtractor