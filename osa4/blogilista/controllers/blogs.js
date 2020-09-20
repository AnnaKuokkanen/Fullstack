const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {name: 1, username: 1, id: 1})

  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  if (request.body.author === undefined || request.body.title === undefined) {
    response.status(400).json(request.body)
  } else {
    const body = request.body
    const user = await User.findById(body.userId)
    const userInfo = (({ name, username, id }) => ({ name, username, id }))(user)

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
    const blogInfo = (({title, author, url, id}) => ({title, author, url, id}))(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)
  
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