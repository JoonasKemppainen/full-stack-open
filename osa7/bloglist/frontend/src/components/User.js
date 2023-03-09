import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const User = () => {
    const id = useParams().id
    const users = useSelector((state) => state.users)
    const user = users.find(user => user.id === id)
    const blogs = useSelector((state) => state.blogs)
    const userBlogs = blogs.filter(blog => blog.user.id === id)

    return (
        <div>
            <h2>{user.name}</h2>
            <p><strong>added blogs</strong></p>
            <Table striped>
                <tbody>
                    {userBlogs.map(blog => 
                        <tr key={blog.id}>
                            <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                        </tr>
                    )}
                </tbody>
                
            </Table>
        </div>
    )
}

export default User