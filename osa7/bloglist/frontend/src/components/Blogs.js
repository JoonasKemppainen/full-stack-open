import Blog from "./Blog"
import { useSelector } from "react-redux"

const Blogs = () => {
	const blogs = useSelector((state) => state.blogs)

	return (
		<div className="blogs">
			{blogs.map(blog =>
				<Blog
					blog={blog}
					key={blog.id} />
			)}
		</div>
	)
}

export default Blogs