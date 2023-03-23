import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { Routes, Route, Link } from "react-router-dom"
import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
import { gql } from '@apollo/client'

export const updateCache = (cache, query, addedBook) => {
  cache.modify({
    fields: {
      allBooks(existingBooks = []) {
        const newBookRef = cache.writeFragment({
          data: addedBook,
          fragment: gql`
            fragment NewBook on Book {
              id
              title
              published
              author {
                id
                name
              }
              genres
            }
          `,
        })
        return [...existingBooks, newBookRef]
      },
    },
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  // const [bookAdded, setBookAdded] = useState(false)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      window.alert('A new book has been added: ' + addedBook.title)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  const style = {
    paddingRight: 10
  }

  // const handleBookAdded = () => {
  //   setBookAdded(!bookAdded)
  // }

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
