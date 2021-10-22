import express from 'express'
import userRouter from './routes/userRoute'
import logMiddleware from './middlewares/logMiddleware'
import authRoute from './routes/authRoute'
import basicAuthMiddleware from './middlewares/basicAuthMiddleware'
import jwtAuthMiddleware from './middlewares/jwtAuthMiddleware'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(basicAuthMiddleware)
server.use(logMiddleware)
server.use(authRoute)
server.use(jwtAuthMiddleware)
server.use(userRouter)


server.listen(3333, () => {
  console.log('cabess')
})