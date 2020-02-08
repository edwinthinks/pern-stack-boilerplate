import logger from 'loglevel'
import { startServer, inProduction } from './src/start.js'

/*
 * Set the corresponding log level to show more or less logs
 * depending if in production or a env variable defines it.
 * Production normallys shows less logs whereas others are
 * set to show more.
 */
const logLevel = process.env.LOG_LEVEL || (inProduction() ? 'warn' : 'info')
logger.setLevel(logLevel)

/*
 * Load environment variables for non production through
 * the .env file located in `/server`
 */
if (!inProduction()) {
  require('dotenv').config()
}

/*
 * Start the server!
 */
startServer()
