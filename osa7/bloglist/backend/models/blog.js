const {MONGODB_URI} = require("../utils/config")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URI)

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	comments: Array
})

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Blog", blogSchema)

