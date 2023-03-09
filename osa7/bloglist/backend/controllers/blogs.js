const Blog = require("../models/blog")
const blogsRouter = require("express").Router()

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: true, name: true, id: true })

	response.status(200).json(blogs)
})
  
blogsRouter.post("/", async (request, response) => {
	const body = request.body
	body.likes = body.likes === undefined ? 0 : body.likes
	body.comments = body.comments === undefined ? [] : body.comments
	
	const user = request.user
  
	if (!user) {
		return response.status(401).json({ error: "token invalid" })
	}
  
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
		comments: body.comments
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
	const user = request.user

	if (!user) {
		return response.status(401).json({ error: "token invalid" })
	}

	const blog = await Blog.findById(request.params.id)

	if (!blog) {
		return response.status(404).json({error: "blog not found"})
	}

	if (blog.user.toString() !== user.id.toString()) {
		return response(403).json({error: "You dont have permission to delete this blog"})
	}

	user.blogs = user.blogs.filter(b => b.toString() !== request.params.id.toString())
	await user.save()

	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const { title, author, url, likes, comments } = request.body
  
	const updatedBlog = {
		title,
		author,
		url,
		likes,
		comments
	}
  
	const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
		new: true,
	})
  
	if (!result) {
		response.status(404).json({ error: "Blog not found" })
	} else {
		response.status(200).json(result)
	}
})

module.exports = blogsRouter