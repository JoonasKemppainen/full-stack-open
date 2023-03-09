import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { Button, Form, FormGroup } from "react-bootstrap"

const CreateBlog = ({ CreateBlogRef }) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	const handleCreate = async e => {
		e.preventDefault()
		try {
			await dispatch(createBlog(title, author, url, user))
			dispatch(createNotification(`a new blog ${title} by ${author} added`, "green", 3))
			setTitle("")
			setAuthor("")
			setUrl("")
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
		<div>
			<h2>create new</h2>
			<Form onSubmit={handleCreate}>
				<FormGroup>
					<Form.Label>title</Form.Label>
					<Form.Control id="title" type="text" name="title" value={title} onChange={handleChange} placeholder="title" required />
					<Form.Label>author</Form.Label>
					<Form.Control id="author" type="text" name="author" value={author} onChange={handleChange} placeholder="author" required />
					<Form.Label>url</Form.Label>
					<Form.Control id="url" type="text" name="url" value={url} onChange={handleChange} placeholder="url" required />
					<br />
					<Button id="create-button" type="submit" >create</Button>
				</FormGroup>
			</Form>
			<br />
		</div>
	)
}

export default CreateBlog