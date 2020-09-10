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
  if (request.body.likes === undefined) {
    blog = new Blog({
      title : request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0 
    })
  } else {
    blog = new Blog(request.body)
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter