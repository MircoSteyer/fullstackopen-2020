import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (username, password) => {
    const user = await loginService.login(username, password)
    if (user) {
      setUser(user)
    }
  }

  if (!user) {
    return <Login handleLogin={handleLogin}/>
  }

  return (
    <div>
      <h2>blogs</h2>
      <h4>Logged in as {user.name}</h4>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
