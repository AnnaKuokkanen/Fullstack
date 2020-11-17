import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './forms/BlogForm'
import LoginForm from './forms/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {
      console.log('No success')
      notifyWith('Wrong credentials', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleAddBlog = (blogObject) => {
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
      notifyWith(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      notifyWith('No success', 'error')
      //console.log('No success:', exception);
    }
  }

  const handleUsername = (value) => {
    setUsername(value)
  }

  const handlePassword = (value) => {
    setPassword(value)
  }

  const notifyWith = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm handleAddBlog={handleAddBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          {blogForm()}
        </div>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsername}
          handlePasswordChange={handlePassword}
        />
      )}
    </div>
  )
}

export default App