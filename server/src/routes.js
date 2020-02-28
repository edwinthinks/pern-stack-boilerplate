import express from 'express'
import * as usersController from './controllers/users-controller.js'

function getRouter () {
  const router = express.Router()

  router.get('/users', usersController.index)
  router.post('/users', usersController.create)

  return router
}

export default getRouter
