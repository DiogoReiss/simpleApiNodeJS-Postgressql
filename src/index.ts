import express from 'express'
import userRouter from './routes/userRoute'
import logMiddleware from './middlewares/logMiddleware'
import authRoute from './routes/authRoute'
import basicAuthMiddleware from './middlewares/basicAuthMiddleware'
import bearerAuthMiddleware from './middlewares/bearerAuthMiddleware'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(basicAuthMiddleware)
server.use(logMiddleware)
server.use(bearerAuthMiddleware, userRouter)
server.use(authRoute)

server.listen(3333, () => {
  console.log('cabess')
})