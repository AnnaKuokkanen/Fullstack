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

test('app is returning correct amount of blogs', () => {
  //api.get('api/blogs/')
    //.then(
  //)

  Blog.find({}).then(blogs => {
    expect(blogs.length === 2)
  });
})

afterAll(() => {
  mongoose.connection.close()
})