import Blog from "./Blog"

const Blogs = ({
	blogs,
	setBlogs,
	user }) => {
	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

	return (
		<div className="blogs">
			{sortedBlogs.map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					setBlogs={setBlogs}
					user={user} />
			)}
		</div>
	)
}

export default Blogs