var _ = require('lodash');

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

const mostLikes = (blogs) => {
  let result = 
      _.chain(blogs)
      .groupBy('author')
      .map((likes, author) => ({author, likes: _.sumBy(likes, function(v) {
        return v.likes})
      }))
      .value()
  
  console.log("Old result", result)

  result = _.maxBy(result, function(r) {
    return r.likes
  })

  console.log("New result", result)

  return result
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog,
  mostBlogs,
  mostLikes
}