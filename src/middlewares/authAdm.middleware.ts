import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { AppError } from "../errors/appError";

const authAdm = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if(!token) {
        return res.status(401).json({
            message: "Missing token"
        })
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (error: any, decoded: any) => {
        if (decoded.isAdm === true) {
            next()
        } else {
            throw new AppError(403, "User is not admin")
        }
    })
}

export { authAdm }
