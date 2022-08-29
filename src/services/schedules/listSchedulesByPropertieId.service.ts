import AppDataSource from "../../data-source";
import { Propertie } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const listSchedulesByPropertieIdService = async ( { id }: any) => {
    const propertiesRepository = AppDataSource.getRepository(Propertie)
    const properties = await propertiesRepository.find()
    const findPropertie = properties.find(properties => properties.id === id)

    if (!findPropertie) {
        throw new AppError(404, "Property not found")
    }

    const propertieSchedules = await propertiesRepository.findOne({
        relations: {
            schedules: true
        },
        where: {
            id: findPropertie?.id
        }
    })
    
    return propertieSchedules
}  

export default listSchedulesByPropertieIdService


