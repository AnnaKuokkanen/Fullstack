const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUser = {
  username: 'username',
  password: 'password'
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('Getting blogs', () => {
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
})

describe('Posting blogs', () => {
  test('blog can be added to /api/blogs', async () => {
    const newBlog = new Blog({
      title: 'Plant life', 
      author: 'Michael',  
      url:'plants.com', 
      likes: 50
    })
  
    await api
          .post('/api/users')
          .send(initialUser)

    const partToken = await api
                    .post('/api/login')
                    .send({ username: 'username', password: 'password' })

    const token = 'bearer ' + partToken.body.token

    console.log('TOKEN ', token)

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)   
  
    const allBlogs = await api.get('/api/blogs')
    
    const blogs = allBlogs.body.map(b => [b.title, b.author, b.url, b.likes])
    const blog = [newBlog.title, newBlog.author, newBlog.url, newBlog.likes]
  
    expect(blogs).toHaveLength(initialBlogs.length + 1)
    expect(blogs).toContainEqual(blog)
  })

  test('if blog does not have title and url it is rejected', async () => {
    const newBlog = {
      author: 'Michael',  
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })  

  test('when likes are not specified, they are zero', async () => {
    const newBlog = {
      title: 'Plant life', 
      author: 'Michael',  
      url:'plants.com'
    }

    await api
    .post('/api/users')
    .send(initialUser)

    const partToken = await api
                      .post('/api/login')
                      .send({ username: 'username', password: 'password' })

    const token = 'bearer ' + partToken.body.token
  
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/) 
  
    const allBlogs = await api.get('/api/blogs')
  
    const blogs = allBlogs.body.map(b => [b.title, b.author, b.url, b.likes])
    const blog = [newBlog.title, newBlog.author, newBlog.url, 0]
  
    expect(blogs).toHaveLength(initialBlogs.length + 1)
    expect(blogs).toContainEqual(blog)
  })

  test('when token is missing or invalid blog cannot be added', async () => {
    const newBlog = {
      title: 'Plant life', 
      author: 'Michael',  
      url:'plants.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    await api
      .post('/api/blogs')
      .set('Authorization', 'abc')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
