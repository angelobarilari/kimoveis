import { Request, Response } from 'express'
import { instanceToPlain } from 'class-transformer'
import listUserService from '../../services/users/listUsers.service'
import "express-async-errors"

const listUserController = async (req: Request, res: Response) => {
    const users =  await listUserService()
    return res.status(200).json(instanceToPlain(users))
}

export default listUserController

