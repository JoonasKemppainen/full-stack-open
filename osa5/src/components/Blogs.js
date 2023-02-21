import Blog from "./Blog"
import PropTypes from "prop-types"

const Blogs = ({
	blogs,
	setNotification,
	setNotificationColor,
	setBlogs,
	user }) => {
	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

	return (
		<div className="blogs">
			{sortedBlogs.map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					setNotification={setNotification}
					setNotificationColor={setNotificationColor}
					setBlogs={setBlogs}
					user={user} />
			)}
		</div>
	)
}

Blog.propTypes = {
	setNotification: PropTypes.func.isRequired,
	setNotificationColor: PropTypes.func.isRequired,
	setBlogs: PropTypes.func.isRequired
}

export default Blogs