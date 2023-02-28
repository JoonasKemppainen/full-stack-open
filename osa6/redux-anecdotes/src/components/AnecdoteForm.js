import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    
    const add = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ""
      dispatch(createAnecdote(content))
      dispatch(createNotification(`you added ${content}`, 10))
    }
  
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={add}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  export default AnecdoteForm