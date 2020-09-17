const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})


describe('Invalid users cannot be added', () => {   
    test('user with no username cannot be added', async () => {
      const user = {
                      name: 'Harry',
                      password: 'word'
                   }
      const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)

      expect(result.body.error).toContain('Salasana ja käyttäjänimi pakollinen')

      const users = await api.get('/api/users')
      expect(users.body.length).toBe(0)
    })

    test('user with no password cannot be added', async () => {
        const user = {
                        name: 'Harry',
                        username: 'harry'
                    }
        const result = await api
          .post('/api/users')
          .send(user)
          .expect(400)

        expect(result.body.error).toContain('Salasana ja käyttäjänimi pakollinen')

        const users = await api.get('/api/users')
        expect(users.body.length).toBe(0)
    })

    test('user with password or username shorter than 3 cannot be added', async () => {
        const user = {
                        name: 'Harry',
                        username: 'ha',
                        password: 'pa'
                    }
        const result = await api
          .post('/api/users')
          .send(user)
          .expect(400)

        expect(result.body.error).toContain('Käyttäjänimen ja salasanan oltava vähintään 3 merkkiä pitkiä')
        const users = await api.get('/api/users')
        expect(users.body.length).toBe(0)
    })

    test('usernames are unique', async () => {
        const user = {
                        name: 'Mary',
                        username: 'potter',
                        password: 'password'
                    }
        await api
          .post('/api/users')
          .send(user)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        const newUser = {
                            name: 'Name',
                            username: 'potter',
                            password: 'pass'
                        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)

        expect(result.body.error).toContain('Käyttäjänimi käytössä')
        const users = await api.get('/api/users')
        expect(users.body.length).toBe(1)
    })
})

afterAll(() => {
  mongoose.connection.close()
})
  