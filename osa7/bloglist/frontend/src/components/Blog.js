import { useState } from "react"
import blogService from "../services/blogs"
import { createNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const Blog = ({
	blog,
	setBlogs,
	user }) => {
	const [viewMore, setViewMore] = useState(false)

	const dispatch = useDispatch()

	const handleView = e => {
		e.preventDefault()
		setViewMore(!viewMore)
	}

	const handleLike = async e => {
		e.preventDefault()
		try {
			const newLikes = blog.likes + 1
			await blogService.like(
				blog.id,
				{
					user: blog.user,
					likes: newLikes,
					author: blog.author,
					title: blog.title,
					url: blog.url
				})
			const updatedBlogs = await blogService.getAll()
			setBlogs(updatedBlogs)
			dispatch(createNotification(`${blog.title} by ${blog.author} liked!`, "green", 3))
		} catch (error) {
			dispatch(createNotification("something went wrong with the like", "red", 3))
		}
	}

	const handleDelete = async e => {
		e.preventDefault()
		if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.deleteBlog(blog.id)
				const updatedBlogs = await blogService.getAll()
				setBlogs(updatedBlogs)
				dispatch(createNotification(`${blog.title} by ${blog.author} deleted`, "green", 3))
			} catch (error) {
				console.log(error)
				dispatch(createNotification("something went wrong with deleting the blog", "red", 3))
			}
		}
	}

	return (
		<div className="blog">
			{viewMore === false
				? (
					<div>
						{blog.title} {blog.author} {" "}
						<button id="view-button" onClick={handleView} >view</button>
					</div>
				) : (
					<div>
						<table>
							<tbody>
								<tr>
									<td>Title:</td>
									<td>{blog.title}</td>
								</tr>
								<tr>
									<td>Author:</td>
									<td>{blog.author}</td>
								</tr>
								<tr>
									<td>Url:</td>
									<td><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></td>
								</tr>
								<tr>
									<td>Likes:</td>
									<td id="likes">{blog.likes}{" "}<button id="like-button" onClick={handleLike}>like</button></td>
								</tr>
								<tr>
									<td>User:</td>
									<td>{blog.user.name}</td>
								</tr>
							</tbody>
						</table>
						<button id="hide-button" onClick={handleView} >hide</button> {" "}
						{user.username === blog.user.username ? <button id="delete-button" className="delete" onClick={handleDelete}>delete</button> : null }
					</div>
				)
			}
		</div>
	)
}

export default Blog