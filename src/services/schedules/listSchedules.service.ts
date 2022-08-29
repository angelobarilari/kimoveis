import AppDataSource from "../../data-source";
import { SchedulesUserProperties } from "../../entities/schedules_users_properties";

const listSchedulesService = async (): Promise<SchedulesUserProperties[]> => {
    const schedulesRepository = AppDataSource.getRepository(SchedulesUserProperties)
    const schedules = await schedulesRepository.find()

    return schedules
}

export default listSchedulesService


