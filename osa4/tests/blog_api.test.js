const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe("HTTP GET", () => {
	test("HTTP GET returns JSON-formed blogs", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/)  
	})

	test("right amount of blogs are returned", async () => {
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	test("identifying field of the returned blogs is called id", async () => {    
		const blogsAtEnd = await helper.blogsInDb() 
		expect(blogsAtEnd.every(blog => blog.id)).toBeDefined()  
	})
})

describe("HTTP POST", () => {
	test("HTTP POST adds a new blog", async () => {
		await api
			.post("/api/blogs")
			.send(helper.newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	})

	test("content of the added blog is correct", async () => {
		await api
			.post("/api/blogs")
			.send(helper.newBlog)
            
		const blogs = await helper.blogsInDb()

		expect(blogs[blogs.length - 1]).toMatchObject(helper.newBlog)
	})
    
	test("if new added blog has so value for likes it becomes 0", async () => {
		await api
			.post("/api/blogs")
			.send(helper.noLikes)

		const blogs = await helper.blogsInDb()

		expect(blogs[blogs.length - 1].likes).toBe(0)
	})

	test("if added blog has no title 400 bad request is returned", async () => {
		await api
			.post("/api/blogs")
			.send(helper.noTitle)
			.expect(400)
	})

	test("if added blog has no url 400 bad request is returned", async () => {
		await api
			.post("/api/blogs")
			.send(helper.noUrl)
			.expect(400)
	})

	test("if added blog has no author 400 bad request is returned", async () => {
		await api
			.post("/api/blogs")
			.send(helper.noAuthor)
			.expect(400)
	})
})

describe("HTTP DELETE", () => {
	test("deletes a blog by id", async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = await blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		const ids = blogsAtEnd.map(b => b.id)
		expect(ids).not.toContain(blogToDelete.id)
	})
})

describe("HTTP PUT", () => {
	test("updates a blog by id", async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			...blogToUpdate,
			likes: 999,
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		const updatedBlogDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

		expect(updatedBlogDb.likes).toBe(999)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})