import { Request, Response } from "express"
import createPropertieService from "../../services/properties/createPropertie.service"

const createPropertyController = async(req: Request, res: Response) => {
    const { value, size, address, categoryId } = req.body
    const property = await createPropertieService( { value, size, address, categoryId } )
    return res.status(201).json(property)
}  

export default createPropertyController
