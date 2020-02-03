import express from 'express'
import bodyParser from 'body-parser'
import logger from 'loglevel'
import getRouter from './routes'

function startServer ({ port = process.env.PORT } = {}) {
  const app = express()
  app.use(bodyParser.json())

  // Define the routes
  const routes = getRouter()
  app.use('/api', routes)

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose)
        })
      }
      resolve(server)
    })
  })
}

export default startServer
