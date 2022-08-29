import AppDataSource from "../../data-source";
import { Propertie } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedules_users_properties";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules"


const createScheduleService = async ( { userId, propertyId, date, hour }: IScheduleRequest ): Promise<SchedulesUserProperties> => {
    const verifyValues = [userId, propertyId, date, hour]

    verifyValues.forEach(element => {
        if (element === null) {
            throw new AppError(400, "Missing data")
        }
    });

    const schedulesRepository = AppDataSource.getRepository(SchedulesUserProperties)
    const propertiesReposititory = AppDataSource.getRepository(Propertie)
    const usersRepository = AppDataSource.getRepository(User)

    const schedules = await schedulesRepository.find()

    const dateValues = `${date}, ${hour}`
    const formatedDate: any = new Date(dateValues);

    if (formatedDate.getDay() === 0 ||
        formatedDate.getDay() === 6) {
            throw new AppError(400, "Invalid day")
        }
    
    if (formatedDate.getHours() >= 18 ||
        formatedDate.getHours() < 8) {
            throw new AppError(400, "Invalid hour")
        }

    const property = await propertiesReposititory.findOne({
        where: {
            id: propertyId
        }
    })
        
    if (!property) {
        throw new AppError(404, "Property not found")
    }

    schedules.find(schedule => {
        const scheduleDates = `${schedule.date}, ${schedule.hour}`
        const date = new Date(scheduleDates)

        if (date.toString() === formatedDate.toString()) {
            throw new AppError(400, "Invalid data")
        }
    })

    const user = await usersRepository.findOneBy({
        id: userId
    })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    const busySchedule = schedules.find(schedule => {
        if (JSON.stringify(schedule.date) === JSON.stringify(date)) {
            if (JSON.stringify(schedule.hour) === JSON.stringify(hour)) {
                return true
            }
        } 
    })

    if (busySchedule) {
        throw new AppError(409, "Another schedule at this time")
    }
    
    const schedule = schedulesRepository.create({
        property,
        user,
        date,
        hour,
    })

    await schedulesRepository.save(schedule)

    return schedule
}

export default createScheduleService
