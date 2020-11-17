import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateBlog }) => {
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
    setBlogObject(newBlog)
    handleUpdateBlog(newBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author}</p>
      {show ? (
        <div>
          {blog.url}
          <p>likes {blog.likes}</p><button onClick={handleLike}>like</button>
          <button onClick={handleShow}>hide</button>
        </div>
      ) : (
        <button onClick={handleShow}>view</button>
      )} 
  </div>
  )
}
export default Blog