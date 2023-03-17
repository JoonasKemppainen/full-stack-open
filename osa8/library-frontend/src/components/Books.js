import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks

  const uniqueGenres = new Set()

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      uniqueGenres.add(genre)
    })
  })

  const genres = [...uniqueGenres]

  const filteredBooks = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books;

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
          {filteredBooks.map((book) => (
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
      {genres.map(genre => (
        <button 
        key={genre} 
        value={genre} 
        onClick={({ target }) => setGenre(target.value)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books
