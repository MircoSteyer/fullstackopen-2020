const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.map(blog => blog.likes).reduce((total, current) => {
        return total + current
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    /*const favoriteBlog = Math.max.apply(Math, blogs.map(blog => blog.likes))*/
    const favoriteBlog = blogs.reduce((previous, current) => {
        return (previous.likes < current.likes) ? current : previous
    })
    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
    }
}

const mostBlogs = (blogs) => {

    const authorAndBlogs = []

    blogs.forEach(blog => {
        if (authorAndBlogs.filter(blogInArray => blogInArray.author === blog.author).length !== 0) {
            authorAndBlogs.map(blogInArray => (blogInArray.author === blog.author) ? (blogInArray.blogs += 1) : blogInArray)
        } else {
            authorAndBlogs.push({author: blog.author, blogs: 1})
        }
    })

    if (authorAndBlogs.length === 0) return {error: "No blogs given."}

    return authorAndBlogs.reduce((previous, current) => {
        return (previous.blogs >= current.blogs) ? previous : current
    })
}

const mostLikes = (blogs) => {

    const authorAndLikes = []

    blogs.forEach(blog => {
        if (authorAndLikes.filter(blogInArray => blogInArray.author === blog.author).length !== 0) {
            authorAndLikes.map(blogInArray => (blogInArray.author === blog.author) ? (blogInArray.likes += blog.likes) : blogInArray)
        } else {
            authorAndLikes.push({author: blog.author, likes: blog.likes})
        }
    })

    if (authorAndLikes.length === 0) return {error: "No blogs given."}

    return authorAndLikes.reduce((previous, current) => {
        return (previous.likes >= current.likes) ? previous : current
    })

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}