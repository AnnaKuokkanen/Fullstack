var _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => likes = likes + blog.likes)

  return likes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null
  let mostLikes = 0

  blogs.forEach(blog => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
      favoriteBlog = blog
    }
  })
  return favoriteBlog
}

const mostBlogs = (blogs) => {

  let result = 
    _.maxBy(blogs, function(o) {
      return o.author
    })
  
  let blogCount = 
    _.filter(blogs, function(o) {
      return o.author === result.author
    })

  return {author: result.author, blogs: blogCount.length}
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog,
  mostBlogs
}