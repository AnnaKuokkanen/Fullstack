import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './forms/BlogForm'
import LoginForm from './forms/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    const b = {title, author, url}
    blogService.create(b)
    setTitle('')
    setAuthor('')
    setUrl('')
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

  return (
    <div>
      {user !== null ? (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

          <BlogForm 
            handleAddBlog={handleAddBlog} 
            title={title} 
            author={author} url={url} 
            handleTitleChange={handleTitle} 
            handleAuthorChange={handleAuthor} 
            handleUrlChange={handleUrl} 
          />

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