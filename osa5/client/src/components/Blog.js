import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateBlog, handleRemoveBlog, currentUser }) => {
  const [show, setShow] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }

  const handleShow = () => {
    setShow(!show)
  }

  const handleLike = () => {
    const newBlog= ({
      id: blogObject.id,
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1,
    })
    handleUpdateBlog(newBlog)
    setBlogObject(newBlog)
  }

  return (
    <div className='blogStyle'>
      <p>{blog.title} by {blog.author}</p>
      {show ? (
        <div>
          {blog.url}
          <p>likes {blog.likes}</p><button id="like-blog-button" onClick={handleLike}>like</button>
          <button onClick={handleShow}>hide</button>
          {currentUser.blogs.includes(blog.id) ? (
            <button id="remove-blog-button" className='remove' onClick={() => handleRemoveBlog(blog)}>remove</button>
          ) : null} 
        </div>
      ) : (
        <button id="view-blog-button" onClick={handleShow}>view</button>
      )}
    </div>
  )
}
export default Blog