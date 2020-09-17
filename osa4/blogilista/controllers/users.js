const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined || body.username === undefined) {
    return response.status(400).json({ error: 'Salasana ja käyttäjänimi pakollinen' })

  }

  const sameUser = await User.findOne({ username: body.username })
  if (sameUser) {
    return response.status(400).json({ error: 'Käyttäjänimi käytössä' })
  }

  if(body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({ error: 'Käyttäjänimen ja salasanan oltava vähintään 3 merkkiä pitkiä' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

module.exports = usersRouter