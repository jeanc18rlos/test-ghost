import express from 'express'
import schema from './graphql'

const app = express()

schema.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send("it's working :)")
})

export { app }
