import React, {useState} from 'react'
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, deleteBlog,  user }) => {

  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
  }

  const viewDetails = () => {
      setShowBlogDetails(!showBlogDetails)
  }

  const addNewLike = () => {
      blog.likes += 1
      const updatedBlog = {...blog}
      console.log("updatedBlog", updatedBlog)
      updateBlog(updatedBlog)
  }

  return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
        </div>
        {showBlogDetails &&
        <div>
          <div>
            {blog.url},
          </div>
          <div>
            Likes: {blog.likes}
            <button onClick={addNewLike}>Like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
        </div>}
        <button onClick={viewDetails}>{showBlogDetails ? "hide": "show"}</button>
          {blog.user.username === user.username && <button onClick={() => deleteBlog(blog)}>delete</button>}
      </div>
  )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired
}

export default Blog
