import { Request, Response } from 'express'
import deleteUserService from '../../services/users/deleteUser.service'
import "express-async-errors"

const deleteUserController = async (req: Request, res: Response) => {
    const { id } = req.params
    await deleteUserService(id)
    return res.status(204).json()
}

export default deleteUserController

