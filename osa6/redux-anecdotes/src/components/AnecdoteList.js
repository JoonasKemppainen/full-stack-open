import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {
      const filter = state.filter
      const filteredAnecdotes = state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
    })
    
    const dispatch = useDispatch()
  
    const vote = (id) => {
      const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
      dispatch(addVote(id))
      dispatch(setNotification(`You voted ${anecdoteToVote.content}`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  
    return (
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  export default AnecdoteList