import { Request, Response } from 'express'
import { instanceToPlain } from 'class-transformer'
import loginUserService from '../../services/login/loginUser.service'
import "express-async-errors"

const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const token =  await loginUserService( { email, password } )
    return res.status(200).json({
        token
    })
}

export default loginUserController




