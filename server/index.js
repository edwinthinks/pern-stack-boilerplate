import logger from 'loglevel'
import startServer from './src/start.js'

/*
 * Set the corresponding log level to show more or less logs
 * depending on the NODE_ENV. Production is set to show less
 * logs whereas others are set to show more.
 */
const isProd = process.env.NODE_ENV === 'production'
const logLevel = process.env.LOG_LEVEL || (isProd ? 'warn' : 'info')
logger.setLevel(logLevel)

startServer()

