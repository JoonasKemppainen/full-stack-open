import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const result = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  const edit = async (event) => {
    event.preventDefault()

    await editAuthor({ variables: { name, setBornTo: Number(born) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <table>
        <tbody>
          <tr>
            <td>name</td>
            <td>
              <select value={name} onChange={({target}) => setName(target.value)}>
                {authors.map(author => 
                  <option key={author.id} value={author.name}>{author.name}</option>
                )}
              </select>
            </td>
          </tr>
          <tr>
            <td>born</td>
            <td>
              <input type="number" value={born} onChange={({target}) => setBorn(target.value)}  />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={edit}>update author</button>
    </div>
  )
}

export default Authors
