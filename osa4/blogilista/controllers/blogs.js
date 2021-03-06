const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {name: 1, username: 1, id: 1})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  try {
    if (request.body.author === undefined || request.body.title === undefined) {
      response.status(400).json(request.body)
    } else {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      const user = await User.findById(decodedToken.id)

      if (body.likes === undefined) {
        blog = new Blog({
          title : body.title,
          author: body.author,
          user: user._id,
          url: body.url,
          likes: 0 
        })
      } else {
        blog = new Blog({
          title: body.title,
          author: body.author, 
          user: user._id,
          url: body.url,
          likes: body.likes
        })
      }

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    }
  } catch (error) {
    next(error)
  }

}) 

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(id)
  
    if (user.id.toString() !== blog.user.toString()) {
      return response.status(401).json('invalid credentials')
    }

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const result = await Blog 
    .findByIdAndUpdate(id, body)

  response.status(200).json(result) 
})

module.exports = blogsRouter