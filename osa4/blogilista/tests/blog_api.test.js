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
  expect(blogs.body.length === initialBlogs.length)
})

test('app is returning json formatted blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is in the field called id', async () => {
  const blogs = await api.get('/api/blogs')

  blogs.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('blog can be added to /api/blogs', async () => {
  const newBlog = new Blog({
    title: 'Plant life', 
    author: 'Michael',  
    url:'plants.com', 
    likes: 50
  })
    
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)   

  const blogs = await api.get('/api/blogs')

  expect(blogs.body.length).toBe(initialBlogs.length + 1)

  expect(blogs.body[2].author).toBe(newBlog.author)

  expect(blogs.body[2].title).toBe(newBlog.title)

  expect(blogs.body[2].url).toBe(newBlog.url)

  expect(blogs.body[2].likes).toBe(newBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})