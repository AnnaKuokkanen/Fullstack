import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }

  const handleShow = () => {
    setShow(!show)
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
          <p>likes {blog.likes}</p><button>like</button>
          <button onClick={handleShow}>hide</button>
        </div>
      ) : (
        <button onClick={handleShow}>view</button>
      )} 
  </div>
  )
}
export default Blog