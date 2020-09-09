const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Books',
      author: 'Mary',
      url: 'books.com',
      likes: 666
    },
    {
      title: 'Films',
      author: 'Charlie',
      url: 'films.com',
      likes: 333
    },
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('app is returning correct amount of blogs', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.length === initialBlogs.length)
})

test('app is returning json formatted blogs', async () => {
  await api.get('/api/blogs')
  blogs => {
    blogs.forEach(blog => expect('Content-Type', /application\/json/))
  }
})

afterAll(() => {
  mongoose.connection.close()
})