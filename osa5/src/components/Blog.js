import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({
	blog,
	setNotification,
	setNotificationColor,
	setBlogs,
	user }) => {
	const [viewMore, setViewMore] = useState(false)

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
			setNotification(`${blog.title} by ${blog.author} liked!`)
			setNotificationColor("green")
			setTimeout(() => {
				setNotification(null)
				setNotificationColor("")
			},3000)
		} catch (error) {
			setNotification("something went wrong with the like")
			setNotificationColor("red")
			setTimeout(() => {
				setNotification(null)
				setNotificationColor("")
			},3000)
		}
	}

	const handleDelete = async e => {
		e.preventDefault()
		if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.deleteBlog(blog.id)
				const updatedBlogs = await blogService.getAll()
				setBlogs(updatedBlogs)
				setNotification(`${blog.title} by ${blog.author} deleted`)
				setNotificationColor("green")
				setTimeout(() => {
					setNotification(null)
					setNotificationColor("")
				}, 3000)
			} catch (error) {
				console.log(error)
				setNotification("something went wrong with deleting the blog")
				setNotificationColor("red")
				setTimeout(() => {
					setNotification(null)
					setNotificationColor("")
				},3000)
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