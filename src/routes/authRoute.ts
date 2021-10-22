import { NextFunction, Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import basicAuthMiddleware from '../middlewares/basicAuthMiddleware'
import jwtAuthMiddleware from '../middlewares/jwtAuthMiddleware'

const authRoute = Router()

authRoute.post('/token', basicAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user
    if (!user) {
      res.status(403).json(`Invalid username or password`)
      throw new Error(`Invalid username or password`)
    }
    const jwtToken = jwt.sign({ 
      username: user.username,
    }, 'my_secret_key', { 
      subject: user?.uuid
    })

    res.status(200).json({token: jwtToken})
    
  } catch (err) {
    throw console.info(`Error -> ${err}`)
  }
})

authRoute.post('/token/validate', jwtAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200)
})

export default authRoute