import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"
import loginService from "../services/login"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        nullUser(state, action) {
            return null
        }
    }
})

export default userSlice.reducer
export const { setUser, nullUser } = userSlice.actions

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
        }
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password,
        })
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const resetUser = () => {
    return async dispatch => {
        dispatch(nullUser())
    }
}