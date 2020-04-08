import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(blogObject)
      setBlogs([...blogs].concat(blog))
      updateNotification({type: 'success', text: `a new blog ${blog.title} by ${blog.author} added`})
    } catch(error) {
      updateNotification({type: 'error', text: error.response.data.error})
    }
  }

  const likeBlog = async (blog, id) => {
    try {
      const updBlog = await blogService.updateBlog(blog, id)
      setBlogs([...blogs].map(b => b.id === id ? updBlog : b))
      updateNotification({type: 'success', text: `you liked ${updBlog.title}`})
    } catch(error) {
      updateNotification({type: 'error', text: error.response.data.error})
    }
  }

  const removeBlog = async (blog, id) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      try {
        await blogService.deleteBlog(id)
        setBlogs([...blogs].filter(b => b.id !== id))
        updateNotification({type: 'success', text: `you removed a ${blog.title}`})
      } catch(error) {
        updateNotification({type: 'error', text: error.response.data.error})
      }
    }
  } 

  const updateNotification = message => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange = {({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      updateNotification({type: 'error', text: 'wrong username or password'})
    }
  }

  const handleLogout = event => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  }

  const sortedBlog = [...blogs].sort((a,b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification message={notification} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm 
          createBlog={addBlog}
        />
      </Togglable>
      {sortedBlog.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          likeBlog={likeBlog} 
          removeBlog={removeBlog} 
          user={user}
        />
      )}
    </div>
  )
}

export default App