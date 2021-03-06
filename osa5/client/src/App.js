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
      blogService.setToken(user.token)
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
    }
  }

  const handleUpdateBlog = (blogObject) => {
    try {
      blogService
        .update(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.filter(b => b.id !== returnedBlog.id).concat(returnedBlog))
        })
      notifyWith(`Blog ${blogObject.title} by ${blogObject.author} updated`, 'success')
    } catch (exeption) {
      notifyWith('No success', 'error')
    }
  }

  const handleRemoveBlog = (blogObject) => {
    console.log('Removing object', blogObject);
    try {
      if (window.confirm('Are u sure?')) {
        blogService
          .remove(blogObject)
          .then(setBlogs(blogs.filter(b => b.id !== blogObject.id)))
        notifyWith(`Blog ${blogObject.title} by ${blogObject.author} deleted`, 'success')
      }
    } catch (exception) {
      notifyWith('No success', 'error')
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
          {blogs.sort((a, b) => a.likes < b.likes ? 1 : -1).map(blog =>
            <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} handleRemoveBlog={handleRemoveBlog} currentUser={user} />
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