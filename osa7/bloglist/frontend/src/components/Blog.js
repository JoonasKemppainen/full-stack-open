import { useState } from "react"
import { createNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { createLike, deleteBlog } from "../reducers/blogReducer"
import { useParams } from "react-router-dom"

const Blog = () => {
	const user = useSelector((state) => state.user)
	const blogs = useSelector((state) => state.blogs)
	const id = useParams().id
	const blog = blogs.find(blog => blog.id === id)
	const dispatch = useDispatch()

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
				await dispatch(deleteBlog(blog.id))
				dispatch(createNotification(`${blog.title} by ${blog.author} deleted`, "green", 3))
			} catch (error) {
				console.log(error)
				dispatch(createNotification("something went wrong with deleting the blog", "red", 3))
			}
		}
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a>
			<br />
			{blog.likes} likes 
			<button id="like-button" onClick={handleLike}>like</button>
			<br />
			<br />
			added by {blog.user.name}
			<br />
			{user.username === blog.user.username 
			? <button id="delete-button" className="delete" onClick={handleDelete}>delete</button> 
			: null }

						
		</div>
	)
}


export default Blog