import { createNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { createLike, deleteBlog, createComment } from "../reducers/blogReducer"
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Table, Button, Form, FormGroup } from "react-bootstrap"

const Blog = () => {
	const [comment, setComment] = useState("")

	const user = useSelector((state) => state.user)
	const blogs = useSelector((state) => state.blogs)
	const id = useParams().id
	const blog = blogs.find(blog => blog.id === id)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLike = async e => {
		e.preventDefault()
		try {
			dispatch(createLike(blog))
			dispatch(createNotification(`${blog.title} by ${blog.author} liked!`, "green", 3))
		} catch (error) {
			dispatch(createNotification("something went wrong with the like", "red", 3))
		}
	}

	const handleDelete = async e => {
		e.preventDefault()
		if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)) {
			try {
				navigate("/")
				await dispatch(deleteBlog(blog.id))
				dispatch(createNotification(`${blog.title} by ${blog.author} deleted`, "green", 3))
			} catch (error) {
				console.log(error)
				dispatch(createNotification("something went wrong with deleting the blog", "red", 3))
			}
		}
	}

	const handleChange = e => {
		e.preventDefault()
		setComment(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await dispatch(createComment(blog, comment))
			dispatch(createNotification("comment added", "green", 3))
			setComment("")
		} catch (error) {
			console.log(error)
			dispatch(createNotification("something went wront with adding the comment", "red", 3))
		}
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			
			<br />
			<a href={blog.url}>{blog.url}</a>
			<br />
			<p>{blog.likes} likes </p>
			<Button id="like-button" onClick={handleLike}>like</Button>
			<br />
			<br />
			added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
			<br />
			{user.username === blog.user.username 
			? <Button variant="danger" id="delete-button" className="delete" onClick={handleDelete}>delete</Button> 
			: null }
			<h3>comments</h3>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Form.Control onChange={handleChange} value={comment} />
					<Button>add comment</Button>
				</FormGroup>				
			</Form>
			<br />
			<Table striped>
				<tbody>
					{blog.comments.map(comment => 
						<tr key={comment}>
							<td>{comment}</td>
						</tr>
					)}
				</tbody>
			</Table>	
		</div>
	)
}


export default Blog