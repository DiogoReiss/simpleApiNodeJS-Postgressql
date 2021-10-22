import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import findUserByID from '../controllers/userRepository/findUserByID'

const bearerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const bearerToken = req.headers['authorization']
    if (!bearerToken) {
      res.status(403).json({ error: 'Invalid authorization header'})
      throw new Error(`Invalid bearer token`)
    }
    const [ authType, token ] = bearerToken.split(' ')
    if (authType !== 'Bearer' || !token) {
      res.status(403).json({ error: 'Invalid authorization header'})
      throw new Error('Invalid authorization')
    }
    const tokenPayload = jwt.verify(token, 'my_secret_key')
    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      res.status(403).json({ error: 'Invalid authorization token'})
      throw new Error('Invalid authorization')
    }
    const uuid = tokenPayload.sub
    const user = await findUserByID(uuid)
    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

export default bearerAuthMiddleware