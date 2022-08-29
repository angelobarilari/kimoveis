import { Request, Response } from "express";
import listSchedulesByPropertieIdService from "../../services/schedules/listSchedulesByPropertieId.service";

const listSchedulesByPropertieIdController = async (req: Request, res: Response) => {
    const { id } = req.params
    const schedules = await listSchedulesByPropertieIdService( { id } )
    return res.status(200).json(schedules)
}

export default listSchedulesByPropertieIdController

