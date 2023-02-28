import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : action.payload)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export default anecdoteSlice.reducer 
export const {addVote, addAnecdote, setAnecdotes} = anecdoteSlice.actions 

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const createVote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch(addVote(votedAnecdote))
  }
}