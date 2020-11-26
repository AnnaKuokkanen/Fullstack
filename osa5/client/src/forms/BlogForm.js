import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleAddBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  BlogForm.propTypes = {
    handleAddBlog: PropTypes.func.isRequired
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

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => handleTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => handleAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => handleUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm