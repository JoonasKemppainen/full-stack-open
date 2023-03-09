import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

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
            <ul>
                {userBlogs.map(blog => 
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}

export default User