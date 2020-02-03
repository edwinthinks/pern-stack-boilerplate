import logger from 'loglevel'
import startServer from './src/start.js'

/*
 * Store a boolean value that indicates if the
 */
const isProd = process.env.NODE_ENV === 'production'

/*
 * Set the corresponding log level to show more or less logs
 * depending if in production or a env variable defines it.
 * Production normallys shows less logs whereas others are
 * set to show more.
 */
const logLevel = process.env.LOG_LEVEL || (isProd ? 'warn' : 'info')
logger.setLevel(logLevel)

/*
 * Load environment variables for non production through
 * the .env file located in `/server`
 */
if (!isProd) {
  require('dotenv').config()
}

/*
 * Start the server!
 */
startServer()
