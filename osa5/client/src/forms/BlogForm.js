import React, { useState, useEffect } from 'react'

const BlogForm = ({ handleAddBlog, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => handleTitleChange(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => handleAuthorChange(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => handleUrlChange(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  ) 
}

export default BlogForm