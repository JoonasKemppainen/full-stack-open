import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommend = (props) => {
    const result = useQuery(ALL_BOOKS)
    const favGenre = useQuery(ME)

    if (result.loading) {
        return <div>Loading...</div>
    }

    const favoriteGenre = favGenre.data.me.favoriteGenre

    const recommended = result.data.allBooks.filter(book => book.genres.includes(favoriteGenre))

    return (
        <div>
            <h2>Recommendations</h2>
            books in your favourite genre
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {recommended.map((book) => (
                    <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend