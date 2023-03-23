import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState, useEffect } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre || null}
  })

  const books = result.data?.allBooks || []

  useEffect(() => {
    const genresSet = new Set()
    books.forEach((book) => {
      book.genres.forEach((genre) => {
        genresSet.add(genre)
      })
    })
    setUniqueGenres([...genresSet])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
      value="" 
      onClick={({ target }) => setGenre(target.value)}>all genres</button>
      {uniqueGenres.map(genre => (
        <button 
        key={genre} 
        value={genre} 
        onClick={({ target }) => setGenre(target.value)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books
