import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useCounterDispatch } from "../CounterContext"

const AnecdoteForm = () => {
  const dispatch = useCounterDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, 
    //päivitetään uusi anecdote myös näytölle
    {
      onSuccess: (anecdote) => {
        queryClient.invalidateQueries("anecdotes")
        dispatch({ type: "SHOW", payload: `${anecdote.content} added`})
        setTimeout(() => {
          dispatch({ type: "CLEAR"})
        }, 5000)
      },
      onError: (error) => {
        console.log(error.message)
        dispatch({ type: "SHOW", payload: "too short anecdote, must have length 5 or more"})
        setTimeout(() => {
          dispatch({type: "CLEAR"})
        }, 5000)
      }    
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
