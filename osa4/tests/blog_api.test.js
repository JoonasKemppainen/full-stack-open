const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")

let token = null

beforeEach(async () => {
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash("salasana", 10)
	const user = new User({ username: "root", passwordHash })
	await user.save()

	const response = await api
		.post("/api/login")
		.send({ username: "root", password: "salasana" })
		.expect(200)

	token = response.body.token

	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe("blogs", () => {
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
				.set("Authorization", `Bearer ${token}`)
				.send(helper.newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/)
	
			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
		})

		test("cant add new blog without token, returns the right status code 401", async () => {
			await api
				.post("/api/blogs")
				.send(helper.newBlog)
				.expect(401)
				.expect("Content-Type", /application\/json/)
	
			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
		})
	
		test("content of the added blog is correct", async () => {
			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(helper.newBlog)
				
			const blogs = await helper.blogsInDb()
	
			expect(blogs[blogs.length - 1]).toMatchObject(helper.newBlog)
		})
		
		test("if new added blog has so value for likes it becomes 0", async () => {
			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(helper.noLikes)
	
			const blogs = await helper.blogsInDb()
	
			expect(blogs[blogs.length - 1].likes).toBe(0)
		})
	
		test("if added blog has no title 400 bad request is returned", async () => {
			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(helper.noTitle)
				.expect(400)
		})
	
		test("if added blog has no url 400 bad request is returned", async () => {
			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(helper.noUrl)
				.expect(400)
		})
	
		test("if added blog has no author 400 bad request is returned", async () => {
			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(helper.noAuthor)
				.expect(400)
		})
	})
	
	describe("HTTP DELETE", () => {
		test("succeeds with status code 204 if id is valid", async () => {
			const newBlog = {
				title: "test blog",
				author: "test author",
				url: "http://www.testblog.com",
				likes: 10
			}
		
			const response = await api
				.post("/api/blogs")
				.send(newBlog)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/)
		
			const blogToDelete = response.body
			const id = blogToDelete.id
		
			await api
				.delete(`/api/blogs/${id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(204)
		
			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
		
			const titles = blogsAtEnd.map(r => r.title)
			expect(titles).not.toContain(blogToDelete.title)
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
})

describe("users", () => {
	describe("when there is initially one user at db", () => {
		beforeEach(async () => {
			await User.deleteMany({})
 
			const passwordHash = await bcrypt.hash("salasana", 10)
			const user = new User({ username: "root", passwordHash })

			await user.save()
		})
 
		test("creation succeeds with a fresh username", async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: "jkempp",
				name: "Joonas Kemppainen",
				password: "salasana"
			}

			await api
				.post("/api/users")
				.send(newUser)
				.expect(201)
				.expect("Content-Type", /application\/json/)

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
 
			const usernames = usersAtEnd.map(u => u.username)
			expect(usernames).toContain(newUser.username)
		})

		test("creation fails with proper statuscode and message if username already taken", async () => {
			const usersAtStart = await helper.usersInDb()
		
			const newUser = {
				username: "root",
				name: "Testuser",
				password: "salasana"
			}
		
			const result = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/)
			
			expect(result.body.error).toContain("username must be unique.")
		
			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})

		test("creation fails with proper statuscode and message if password is too short", async () => {
			const newUser = {
				username: "testuser",
				name: "Testuser",
				password: "sa"
			}
		
			const result = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/)

			expect(result.body.error).toContain("Password must be 3 characters or more")
			
			const users = await helper.usersInDb()
			expect(users).toHaveLength(1)
		})
		
		test("creation fails with proper statuscode and message if username is too short", async () => {
			const newUser = {
				username: "te",
				name: "Testuser",
				password: "salasana"
			}
		
			const result = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/)

			expect(result.body.error).toContain("Username must be 3 characters or more")
 
			const users = await helper.usersInDb()
			expect(users).toHaveLength(1)
		})
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})