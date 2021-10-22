import express from 'express'
import findUserByUsernameAndPassword from '../controllers/userRepository/findUserByUsernameAndPassword'

const basicAuthMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try { 
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      res.status(403).json({ error: 'Invalid authorization header'})
      throw new Error('Invalid authorization')
    }

    const [authType, token] = authHeader.split(' ')
    if (authType !== 'Basic' || !token) {
      res.status(403).json({ error: 'Invalid authorization header'})
      throw new Error('Invalid authorization')
    } 
    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')
    const [username, password] = tokenContent.split(':')

    if (!username || !password) {
      res.status(403).json({ error: 'Invalid authorization header'})
    }

    const user = await findUserByUsernameAndPassword({username, password})
    
    if (!user) {
      res.status(403).json({ error: 'Invalid username or password' })
      throw new Error(`Invalid username or password!`)
    }
    req.user = user
    next()
  } catch (err) {
    next(err)
  }

}

export default basicAuthMiddleware