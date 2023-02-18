const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const blogsRouter = require("express").Router()
const User = require("../models/user")

const getTokenFrom = request => {
	const authorization = request.get("authorization")
	if (authorization && authorization.startsWith("Bearer ")) {
		console.log(authorization.replace("Bearer ", ""))
		return authorization.replace("Bearer ", "")
	}
	return null
}

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: true, name: true, id: true })

	response.status(200).json(blogs)
})
  
blogsRouter.post("/", async (request, response) => {
	const body = request.body
	body.likes = body.likes === undefined ? 0 : body.likes
	// eslint-disable-next-line no-undef
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	console.log(decodedToken)
	if (!decodedToken.id) {
		return response.status(401).json({error: "token invalid"})
	}
  
	const user = await User.findByIdAndDelete(decodedToken)
  
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	if (!blog.title || !blog.url) {
		response.status(400).end()
	} else {
		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.status(201).json(savedBlog)
	}	
})

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const { title, author, url, likes } = request.body
  
	const updatedBlog = {
		title,
		author,
		url,
		likes,
	}
  
	const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
		new: true,
	})
  
	if (!result) {
		response.status(404).json({ error: "Blog not found" })
	} else {
		response.status(200).json(updatedBlog)
	}
})

module.exports = blogsRouter