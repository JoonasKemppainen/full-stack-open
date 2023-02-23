import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

test("renders the title and author of the blog, but does not render the url or the number of likes by default", async () => {
	const blog = {
		title: "Test Blog",
		author: "TesterBot",
		likes: 6,
		url: "http://www.test.com"
	}

	render(<Blog blog={blog} />)

	await waitFor(() => {
		const title = screen.findByText("Test Blog")
		const author = screen.findByText("TesterBot")
		expect(title).toBeDefined()
		expect(author).toBeDefined()
	})

	const likes = screen.queryByText(6)
	expect(likes).toBeNull()

	const url = screen.queryByText("http://www.test.com")
	expect(url).toBeNull()
})

test("also url, likes and user will be shown after 'view' is clicked", () => {
	const blog = {
		title: "Test Blog",
		author: "TesterBot",
		likes: 6,
		url: "http://www.test.com",
		user: {
			name: "Mr Tester",
			username: "testuser"
		}
	}
  
	const mockHandler = jest.fn()
  
	render(<Blog blog={blog} handleView={mockHandler} user={blog.user} />)
  
	const button = screen.getByText("view")
	fireEvent.click(button)
  
	const url = screen.getByText("http://www.test.com")
	const likes = screen.getByText(6)
	const userName = screen.getByText("Mr Tester")
	expect(url).toBeDefined()
	expect(likes).toBeDefined()
	expect(userName).toBeDefined()
})

// test("clicking the like button calls the handleLike function", async () => {
// 	const blog = {
// 		title: "Test Blog",
// 		author: "TesterBot",
// 		likes: 6,
// 		url: "http://www.test.com",
// 		user: {
// 			name: "Mr Tester",
// 			username: "testuser",
// 		},
// 	}

// 	const mockHandleLike = jest.fn()

// 	const mockHandler = jest.fn()

// 	render(
// 		<Blog
// 			blog={blog}
// 			handleLike={mockHandleLike}
// 			handleView={mockHandler}
// 			user={blog.user}
// 			setNotification={() => {}}
// 			setNotificationColor={() => {}}
// 			setBlogs={() => {}}
// 		/>
// 	)

// 	const viewButton = await screen.getByText("view")

// 	await userEvent.click(viewButton)

// 	const likeButton = screen.getByText("like")

// 	await userEvent.click(likeButton)
// 	await userEvent.click(likeButton)

// 	expect(mockHandleLike.mock.calls).toHaveLength(2)
// })
