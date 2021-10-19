import { Request, Response, NextFunction } from 'express'

const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(`LogINFO -> ${req.ip} made a request on path: ${req.path}`)
  next()
}

export default logMiddleware