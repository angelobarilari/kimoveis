import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
    let token = req.headers.authorization
    const { propertyId, date, hour } = req.body
    
    if(!token){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    token = token.split(' ')[1]

    const userId = jwt.verify(token, process.env.SECRET_KEY as string, (error: any, decoded: any) => {
        if (error) {
            throw new AppError(401, "Invalid token")
        }

        return decoded.sub
    })

    if (typeof userId !== "string") {
        throw new AppError(401, "Invalid user")
    }
    
    await createScheduleService( { userId, propertyId, date, hour } )

    return res.status(201).json( { message: "Schedule created" } )
}

export default createScheduleController

