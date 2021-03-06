import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({type: "", message: ""})

  // description of what's happening here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  const blogsSortedByLikes = blogs.sort((a, b) => {
      return b.likes - a.likes
  })

  const togglableRef = useRef()

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
    togglableRef.current.toggleVisibility()
    const response = await blogService.createBlog(newBlog)
    setBlogs(blogs.concat(response))
    handleMessage("success", "a new bloglist-backend has been added", 4000)
  }

  const updateBlog = async (blogToUpdate) => {
    const response = await blogService.updateBlog(blogToUpdate)
    console.log("updatedblog2", response)
    setBlogs(blogs.map(blog => blog === blogToUpdate ? response : blog))
  }

  const deleteBlog = async (blogToDelete) => {
      if (window.confirm("Do you really want to delete your blog?")) {
          try {
              const response = await blogService.deleteBlog(blogToDelete)
              console.log("we are done here")
              setBlogs(blogs.filter(blog => blog !== blogToDelete))
          } catch (e) {
          }
      }
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
      <Togglable buttonLabel={"new blog"} ref={togglableRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      {blogsSortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App
