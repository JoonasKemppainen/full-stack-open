import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { Routes, Route, Link } from "react-router-dom"
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const style = {
    paddingRight: 10
  }

  const logout = (event) => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Link style={style} to="/">authors</Link>
      <Link style={style} to="/books">books</Link>
      {token !== null
      ?
      <>
      <Link style={style} to="/add">add book</Link> 
      <Link style={style} to="/recommend">recommend</Link>
      <button onClick={logout}>logout</button> 
      </>
      :
      <Link style={style} to="/login">login</Link>
      }
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books token={token} />} />
        <Route path="/add" element={<NewBook token={token} />} />
        <Route path="/login" element={
          <LoginForm
            token={token}
            setToken={setToken} />
        } />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </div>
  )
}

export default App
