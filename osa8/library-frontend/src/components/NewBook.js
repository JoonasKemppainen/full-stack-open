import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = ({token}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()

    await addBook({ variables: { title, author, published: Number(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      {token === null
      ? <h2>Login to add books</h2>
      :
      <div>
        <h2>Add book</h2>
        <form onSubmit={submit}>
          <table>
            <tbody>
              <tr>
                <td>title</td>
                <td>
                  <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </td>
              </tr><tr>
                <td>author</td>
                <td>
                  <input
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                  />
                </td>
              </tr><tr>
                <td>published</td>
                <td>
                  <input
                    type="number"
                    value={published}
                    onChange={({ target }) => setPublished(target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">
              add genre
            </button>
          </div>
          <div>genres: {genres.join(' ')}</div>
          <button type="submit">create book</button>
        </form>
        </div>
      } 
    </div>
  )
}

export default NewBook