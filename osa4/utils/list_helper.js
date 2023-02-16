// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.reduce((sum, obj) => sum + obj.likes, 0)
}

const favoriteBlog = blogs => {
	let favBlog = blogs[0]

	for (let blog of blogs) {
		if (blog.likes > favBlog.likes) {
			favBlog = blog
		}
	}
	
	return {
		title: favBlog.title,
		author: favBlog.author,
		likes: favBlog.likes
	}
}

const mostBlogs = blogs => {
	let blogObj = {}

	for (let blog of blogs) {
		blogObj[blog.author] = blogObj[blog.author] === undefined ? 1 : blogObj[blog.author] += 1
	}
	
	let mostActive = {author: null, blogs: -1}

	for (let author in blogObj) {
		if (blogObj[author] > mostActive.blogs) {
			mostActive.author = author
			mostActive.blogs = blogObj[author]
		}
	}

	return mostActive
}

const mostLikes = blogs => {
	let blogObj = {}

	for (let blog of blogs) {
		blogObj[blog.author] = blogObj[blog.author] === undefined ? blog.likes : blogObj[blog.author] += blog.likes
	}

	let mostLiked = {author: null, likes: -1}

	for (let author in blogObj) {
		if (blogObj[author] > mostLiked.likes) {
			mostLiked.author = author
			mostLiked.likes = blogObj[author]
		}
	}

	return mostLiked
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}