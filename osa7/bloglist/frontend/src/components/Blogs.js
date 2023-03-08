import Blog from "./Blog"
import { useSelector } from "react-redux"

const Blogs = ({ user }) => {
	const blogs = useSelector((state) => state.blogs)

	return (
		<div className="blogs">
			{blogs.map(blog =>
				<Blog
					blog={blog}
					key={blog.id}
					user={user} />
			)}
		</div>
	)
}

export default Blogs