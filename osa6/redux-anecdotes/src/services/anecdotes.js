import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content: content, 
    votes: 0}
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const votedAnecdote = anecdote.data
  const newVotes = votedAnecdote.votes + 1
  const changedAnecdote = {
    ...votedAnecdote,
    votes: newVotes
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, vote }