import { app } from './app'
import chalk from 'chalk'
import db from './db'
// Constants
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8888

;(async () => {
  try {
    await db()
    await app.listen(PORT, HOST)
    return console.log(`Listening on port ${chalk.cyan(PORT)}`)
  } catch (e) {
    return console.log(`error ${e}`)
  }
})()
