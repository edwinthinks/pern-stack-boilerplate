import express from 'express'
import * as usersController from './controllers/users-controller.js'

function getRouter () {
  const router = express.Router()

  router.get('/users', usersController.index)
  router.post('/users', usersController.create)
  router.get('/users/:id', usersController.show)
  router.patch('/users/:id', usersController.update)

  return router
}

export default getRouter
