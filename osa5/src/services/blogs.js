import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const create = async newBlog => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const like = async (id, likedBlog) => {
	const response = await axios.put(`${baseUrl}/${id}`, likedBlog)
	return response.data
}

const deleteBlog = async (id) => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}

export default {
	getAll,
	setToken,
	create,
	like,
	deleteBlog
}