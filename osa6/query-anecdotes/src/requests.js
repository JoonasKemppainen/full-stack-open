import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createAnecdote = async (content) => {
    const newAnecdote = {
        content: content,
        votes:0
    }
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
}

export const updateVote = async (id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`)
    const anecdoteToChange = anecdote.data
    const newVotes = anecdoteToChange.votes + 1
    const changedAnecdote = {
        ...anecdoteToChange,
        votes: newVotes
    }
    const res = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
    return res.data
}