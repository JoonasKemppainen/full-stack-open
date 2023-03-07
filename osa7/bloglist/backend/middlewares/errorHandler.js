const logger = require("../utils/logger")

function errorHandler(err, req, res, next) {
	logger.error(err.message)
	if (err.name === "JsonWebTokenError") {
		return res.status(401).json({ error: "invalid token" })
	}
	if (err.name === "TokenExpiredError") {
		return res.status(401).json({ error: "token expired" })
	}
	if (err.name === "CastError") {
		return res.status(400).json({ error: "malformed id" })
	}
	if (err.name === "ValidationError") {
		return res.status(400).json({ error: err.message })
	}

	return next(err)
}

module.exports = errorHandler