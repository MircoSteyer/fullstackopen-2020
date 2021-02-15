import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({type: "", message: ""})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const existingUser = JSON.parse(window.localStorage.getItem("loggedInUser"))
    if (existingUser) {
      setUser(existingUser)
      blogService.setToken(existingUser.token)
    }
  }, [])

  const handleMessage = (type, message, duration) => {
    setNotification({type, message})
    setTimeout(() => {
        setNotification({type: "", message: ""})
    }, duration)
  }

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login(username, password)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      handleMessage("success", "successful login", 4000)
    } catch (e) {
      handleMessage("error", "login failed", 4000)
    }
  }

  const handleLogout = () => {
      window.localStorage.removeItem("loggedInUser")
      // This method takes an optional parameter which by default is false.
      // If set to true, the browser will do a complete page refresh from the server and not from the cached version of the page.
      window.location.reload(false)
  }

  const addBlog = async (newBlog) => {
    const response = await blogService.createBlog(newBlog)
    setBlogs(blogs.concat(response))
    handleMessage("success", "a new blog has been added", 4000)
  }

  if (!user) {
    return (
        <>
          {notification && <Notification notification={notification}/>}
          <Login handleLogin={handleLogin}/>
        </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <button onClick={handleLogout}>Logout</button>
      <h4>Logged in as {user.name}</h4>
      <BlogForm addBlog={addBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
