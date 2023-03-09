import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Blogs = () => {
	const blogs = useSelector((state) => state.blogs)

	return (
		<ul className="blogs">
			{blogs.map(blog =>
				<li key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</li>
			)}
		</ul>
	)
}

export default Blogs