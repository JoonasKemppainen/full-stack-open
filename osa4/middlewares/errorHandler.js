function errorHandler(err, req, res, next) {
	if (err.name === "JsonWebTokenError") {
		return res.status(401).json({ error: "invalid token" })
	}
	if (err.name === "TokenExpiredError") {
		return res.status(401).json({ error: "token expired" })
	}

	return next(err)
}

module.exports = errorHandler