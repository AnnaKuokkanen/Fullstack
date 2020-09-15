const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { result } = require('lodash')
const { request } = require('express')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
  if (request.body.author === undefined || request.body.title === undefined) {
    response.status(400).json(request.body)
  } else {
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
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog
    .findByIdAndRemove(id)
  
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const result = await Blog 
    .findByIdAndUpdate(id, body)

  response.status(200).json(result)
  
})

module.exports = blogsRouter