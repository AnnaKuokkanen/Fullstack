import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }

  return (
    <div>
    {blog.title} {blog.author}
  </div>
  )
}
export default Blog