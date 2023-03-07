import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: "notification",
	initialState: {message: "", color: ""},
	reducers: {
		setGreenNotification(state, action) {
			state.message = action.payload
            state.color = "green"
		},
        setRedNotification(state, action) {
            state.message = action.payload
            state.color = "red"
        },
		clearNotification(state, action) {
			state.message = ""
            state.color = ""
		}
	}
})

export default notificationSlice.reducer
export const { setGreenNotification, setRedNotification, clearNotification } = notificationSlice.actions

export const createNotification = (message, color, duration) => {
    return dispatch => {
        if (color === "green") {
            dispatch(setGreenNotification(message))
        } else {
            dispatch(setRedNotification(message))
        }
      setTimeout(() => {
        dispatch(clearNotification())
      },duration * 1000)
    }
}