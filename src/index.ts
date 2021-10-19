import express from 'express'
import userRouter from './routes/userRoute'
import logMiddleware from './middlewares/logMiddleware'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(logMiddleware)
server.use(userRouter)

server.listen(3333, () => {
  console.log('cabess')
})