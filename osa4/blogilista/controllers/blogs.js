const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogsRouter.post('/', async (request, response) => {
  if (request.body.author === undefined || request.body.title === undefined) {
    response.status(400).json(request.body)
  } else {
    const user = await User.findById(request.body.userId)
    if (request.body.likes === undefined) {
      blog = new Blog({
        title : request.body.title,
        author: request.body.author,
        user: user._id,
        url: request.body.url,
        likes: 0 
      })
    } else {
      blog = new Blog({
        title: request.body.title,
        author:request.body.author, 
        user: user._id,
        url: request.body.url,
        likes: request.body.likes
      })
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
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