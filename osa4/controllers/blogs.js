const Blog = require("../models/blog")
const blogsRouter = require("express").Router()

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({})

	response.status(200).json(blogs)
})
  
blogsRouter.post("/", async (request, response) => {
	const blog = await new Blog(request.body)
	blog.likes = blog.likes === undefined ? 0 : blog.likes
  
	if (!blog.title || !blog.url) {
		response.status(400).end()
	} else {
		const savedBlog = await blog.save()
		response.status(201).json(savedBlog)
	}	
})

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const blog = await new Blog(request.body)

	const updatedBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes
	}

	await Blog
		.findByIdAndUpdate(request.params.id, updatedBlog, {
			new: true,
		})

	response.status(200).json(updatedBlog)
})

module.exports = blogsRouter