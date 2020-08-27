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

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog
}