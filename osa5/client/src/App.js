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
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [ notification, setNotification ] = useState(null)

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
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {
      console.log('No success');
      setErrorMessage('wrong credentials')
      notifyWith('Wrong username or password', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleAddBlog = (event) => {
    event.preventDefault()
    try {
      const b = {title, author, url}
      blogService.create(b)
      notifyWith(`A new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notifyWith('No success', 'error')
      console.log('No success:', exception);
    }
  }

  const handleUsername = (value) => {
    setUsername(value)
  }

  const handlePassword = (value) => {
    setPassword(value)
  }

  const handleTitle = (value) => {
    setTitle(value)
  }

  const handleAuthor = (value) => {
    setAuthor(value)
  }

  const handleUrl = (value) => {
    setUrl(value)
  }

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Notification notification={notification} />
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <Togglable buttonLabel={'new blog'}>
            <BlogForm 
              handleAddBlog={handleAddBlog} 
              title={title} 
              author={author} url={url} 
              handleTitleChange={handleTitle} 
              handleAuthorChange={handleAuthor} 
              handleUrlChange={handleUrl} 
            />
          </Togglable> 
          <button onClick={handleLogout}>logout</button>
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