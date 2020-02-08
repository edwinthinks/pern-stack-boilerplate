import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import logger from 'loglevel'
import getRouter from './routes'
import './models'

function startServer ({ port = process.env.PORT } = {}) {
  const app = express()
  app.use(bodyParser.json())

  // Define the API routes
  const routes = getRouter()
  app.use('/api', routes)

  if (inProduction()) {
    // If the server is running in production, the client should
    // be served from the `build` directory of the `client` folder.
    const clientPath = path.join(__dirname, '/../../client/build');
    app.use(express.static(clientPath));
  }

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

function inProduction() {
  return process.env.NODE_ENV === 'production'
}

export { startServer, inProduction }
