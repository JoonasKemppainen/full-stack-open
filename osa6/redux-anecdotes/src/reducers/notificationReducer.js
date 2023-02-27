import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: { message: "", show: false },
    reducers: {
      setNotification(state, action) {
        state.message = action.payload
        state.show = true
      },
      clearNotification(state, action) {
        state.message = ""
        state.show = false
      }
    },
  })

export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions