import { Request, Response } from 'express'
import { instanceToPlain } from 'class-transformer'
import createUserService from '../../services/users/createUser.service'
import "express-async-errors"

const createUserController = async (req: Request, res: Response) => {
        const { name, email, password, isAdm } = req.body
        const newUser =  await createUserService( { name, email, password, isAdm } )
        return res.status(201).json(instanceToPlain(newUser))
}

export default createUserController

