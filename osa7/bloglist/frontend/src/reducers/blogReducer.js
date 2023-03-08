import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: "blog",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        likeBlog(state, action) {
            const updatedBlogs = state.map(blog =>
                blog.id === action.payload.id ? action.payload : blog
              );
              return updatedBlogs;
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload.id)
        }
    }
})

export default blogSlice.reducer
export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (title, author, url) => {
    return async dispatch => {
        const newBlog = await blogService.create({
            title,
            author,
            url
        })
        dispatch(appendBlog(newBlog))
    }
}

export const createLike = (id, updatedBlog) => {
    return async dispatch => {
        const likedBlog = await blogService.like(id, updatedBlog)
        dispatch(likeBlog(likedBlog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        console.log("test")
        const deletedBlog = await blogService.deleteBlog(id)
        dispatch(removeBlog(deletedBlog))
    }
}