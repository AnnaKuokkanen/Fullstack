const blogsRouter = require('express').Router()
const blog = require('./models/blog')

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
      mongoose.connection.close()
    })
})

module.exports = blogsRouter