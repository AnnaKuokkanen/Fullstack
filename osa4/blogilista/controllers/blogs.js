const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
  blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
      mongoose.connection.close()
    })
})

module.exports = blogsRouter