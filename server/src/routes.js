import express from 'express'
import * as sampleController from './controllers/sample-controller.js'

function getRouter () {
  const router = express.Router()

  router.get('/random', sampleController.randomNumber)

  return router
}

export default getRouter
