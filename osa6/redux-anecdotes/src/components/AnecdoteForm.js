import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteServices from "../services/anecdotes"

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    
    const add = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ""
      const newAnecdote = await anecdoteServices.createNew(content)
      dispatch(addAnecdote(newAnecdote))
      dispatch(setNotification(`you added ${content}`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      
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