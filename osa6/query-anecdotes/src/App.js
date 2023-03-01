import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateVote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useCounterDispatch } from "./CounterContext"

const App = () => {
  const dispatch = useCounterDispatch()

  const queryClient = useQueryClient()

  const newVoteMutation = useMutation(updateVote,
    //päivitetään uusi vote myös näytölle
    {
      onSuccess: (anecdote) => {
        queryClient.invalidateQueries("anecdotes")
        dispatch({ type: "SHOW", payload: `${anecdote.content} voted`})
        setTimeout(() => {
          dispatch({ type: "CLEAR"})
        }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote)
  }

  const result = useQuery("anecdotes", getAnecdotes)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
