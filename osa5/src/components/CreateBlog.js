import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const CreateBlog = ({
	blogs,
	setBlogs,
	setNotification,
	setNotificationColor,
	CreateBlogRef
}) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const handleCreate = async e => {
		e.preventDefault()
		try {
			const newBlog = await blogService.create({
				title, author, url
			})
			setBlogs([...blogs, newBlog])
			setNotification(`a new blog ${title} by ${author} added`)
			setNotificationColor("green")
			setTitle("")
			setAuthor("")
			setUrl("")
			const updatedBlogs = await blogService.getAll()
			await setBlogs(updatedBlogs)
			await CreateBlogRef.current.toggleVisibility()
			setTimeout(() => {
				setNotification(null)
				setNotificationColor("")
			},3000)
		} catch (error) {
			console.log(error)
			setNotificationColor("red")
			setNotification("give title, author and url to create a blog")
			setTimeout(() => {
				setNotification(null)
				setNotificationColor("")
			},3000)
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
							<input type="text" name="title" value={title} onChange={handleChange} required />
						</td>
					</tr>
					<tr>
						<td>author:</td>
						<td>
							<input type="text" name="author" value={author} onChange={handleChange} required />
						</td>
					</tr>
					<tr>
						<td>url:</td>
						<td>
							<input type="text" name="url" value={url} onChange={handleChange} required />
						</td>
					</tr>
				</tbody>
			</table>
			<button type="submit">create</button>
		</form>
	)
}

CreateBlog.propTypes = {
	setBlogs: PropTypes.func.isRequired,
	setNotification: PropTypes.func.isRequired,
	setNotificationColor: PropTypes.func.isRequired,
	CreateBlogRef: PropTypes.object.isRequired
}

export default CreateBlog