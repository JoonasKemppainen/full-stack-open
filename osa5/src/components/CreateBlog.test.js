import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import CreateBlog from "./CreateBlog"

describe("CreateBlog", () => {
	test("calls the callback function with correct data when a blog is created", () => {
		const handleCreate = jest.fn()
		const setBlogs = jest.fn()
		const setNotification = jest.fn()
		const setNotificationColor = jest.fn()
		const CreateBlogRef = jest.fn()

		render(
			<CreateBlog
				handleCreate={handleCreate}
				setBlogs={setBlogs}
				setNotification={setNotification}
				setNotificationColor={setNotificationColor}
				CreateBlogRef={CreateBlogRef}
			/>
		)

		const titleInput = screen.getByPlaceholderText("title")
		const authorInput = screen.getByPlaceholderText("author")
		const urlInput = screen.getByPlaceholderText("url")
		const button = screen.getByText("create")

		fireEvent.change(titleInput, { target: { value: "Test Blog" } })
		fireEvent.change(authorInput, { target: { value: "TesterBot" } })
		fireEvent.change(urlInput, { target: { value: "http://www.test.com" } })

		fireEvent.click(button)

		expect(handleCreate).toHaveBeenCalledWith({
			title: "Test Blog",
			author: "TesterBot",
			url: "http://www.test.com",
		})
	})
})