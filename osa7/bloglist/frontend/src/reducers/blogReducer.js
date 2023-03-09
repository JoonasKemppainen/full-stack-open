import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        likeBlog(state, action) {
            return state.map(blog =>
                blog.id === action.payload.id ? {
                    ...blog,
                    likes: action.payload.likes
                } : blog
              )
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload)
        },
        commentBlog(state, action) {
            return state.map(blog =>
                blog.id === action.payload.id ? {
                    ...blog,
                    comments: action.payload.comments
                } : blog
              )
        }
    }
})

export default blogSlice.reducer
export const { setBlogs, appendBlog, likeBlog, removeBlog, commentBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (title, author, url, user) => {
    return async dispatch => {
        const newBlog = await blogService.create({
            title,
            author,
            url
        })
        const updatedBlog = {
            ...newBlog,
            user: {
                username: user.username,
                name: user.name,
                id: user.id
            }
        }
        dispatch(appendBlog(updatedBlog))
    }
}

export const createLike = (blog) => {
    return async dispatch => {
        const id = blog.id
        const newLikes = blog.likes + 1
        const updatedBlog = {
            user: blog.user,
            likes: newLikes,
            author: blog.author,
            title: blog.title,
            url: blog.url,
            comments: blog.comments
        }
        const likedBlog = await blogService.like(id, updatedBlog)
        dispatch(likeBlog(likedBlog))
    }
}

export const createComment = (blog, comment) => {
    return async dispatch => {
        const id = blog.id
        const newComments = [...blog.comments, comment]
        const updatedBlog = {
            ...blog,
            comments: newComments
        }
        const commentedBlog = await blogService.comment(id, updatedBlog)
        dispatch(commentBlog(commentedBlog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch(removeBlog(id))
    }
}