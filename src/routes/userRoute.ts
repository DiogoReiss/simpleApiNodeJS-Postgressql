import { NextFunction, Request, Response, Router } from 'express'
import createUser from '../controllers/userRepository/createUser';
import deleteUser from '../controllers/userRepository/deleteUser';
import findAllUsers from '../controllers/userRepository/findAllUsers'
import findUserByID from '../controllers/userRepository/findUserByID';
import findUserByUsernameAndPassword from '../controllers/userRepository/findUserByUsernameAndPassword';
import updateUser from '../controllers/userRepository/updateUser';

import User from '../models/userModel';

const userRouter = Router();

userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const users = await findAllUsers()
    return res.status(200).send(users)

  }  catch (err) {
    return res.status(404).json(`Error -> ${err}` )
  }
})

userRouter.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let uuid = req.params.uuid
    let userByID = await findUserByID(uuid)

    return res.status(200).send(userByID)
  } catch (err) {
    return res.status(404).json(`Error -> ${err}` )
  }
})

userRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const newUser: User = req.body
    let response = await createUser(newUser)
    return res.status(201).json({response})
  } catch (err) {
    return res.status(404).json(`Error -> ${err}` )
  }
})

userRouter.put('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataToUpdate: User = req.body
    await updateUser(dataToUpdate)

    return res.status(200).json(`User ${dataToUpdate.username} -> Updated!`)
  } catch (err) {
    return res.status(404).json(`Error -> ${err}` )
  }
})

userRouter.delete('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToDelete: string = req.params.uuid
    await deleteUser(userToDelete)
    return res.status(200).json(`User ${userToDelete} -> Removed!`)
  } catch (err) {
    return res.status(404).json(`Error -> ${err}` )
  }
})

userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body
    const response = await findUserByUsernameAndPassword(user)
    return res.status(200).json({response})
  } catch (err) {
    return res.status(403).json(`Error -> ${err}`)
  }
})

export default userRouter