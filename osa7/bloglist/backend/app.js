const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")

const middleware = {
	tokenExtractor: require("./middlewares/tokenExtractor"),
	userExtractor: require("./middlewares/userExtractor"),
	errorHandler: require("./middlewares/errorHandler")
} 
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(middleware.errorHandler)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing")
	app.use("/api/testing", testingRouter)
}

module.exports = app