import { useState } from "react"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"

const CreateBlog = ({
	blogs,
	setBlogs,
	CreateBlogRef
}) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const dispatch = useDispatch()

	const handleCreate = async e => {
		e.preventDefault()
		try {
			const newBlog = await blogService.create({
				title, author, url
			})
			setBlogs([...blogs, newBlog])
			dispatch(createNotification(`a new blog ${title} by ${author} added`, "green", 3))
			setTitle("")
			setAuthor("")
			setUrl("")
			const updatedBlogs = await blogService.getAll()
			await setBlogs(updatedBlogs)
			await CreateBlogRef.current.toggleVisibility()
		} catch (error) {
			console.log(error)
			dispatch(createNotification("give title, author and url to create a blog", "red", 3))
		}
	}

	const handleChange = e => {
		if (e.target.name === "title") setTitle(e.target.value)
		if (e.target.name === "author") setAuthor(e.target.value)
		if (e.target.name === "url") setUrl(e.target.value)
	}

	return (
		<form onSubmit={handleCreate} >
			<h2>create new</h2>
			<table>
				<tbody>
					<tr>
						<td>title:</td>
						<td>
							<input id="title" type="text" name="title" value={title} onChange={handleChange} placeholder="title" required />
						</td>
					</tr>
					<tr>
						<td>author:</td>
						<td>
							<input id="author" type="text" name="author" value={author} onChange={handleChange} placeholder="author" required />
						</td>
					</tr>
					<tr>
						<td>url:</td>
						<td>
							<input id="url" type="text" name="url" value={url} onChange={handleChange} placeholder="url" required />
						</td>
					</tr>
				</tbody>
			</table>
			<button id="create-button" type="submit">create</button>
		</form>
	)
}

export default CreateBlog