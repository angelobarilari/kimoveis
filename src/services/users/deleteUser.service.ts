import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const deleteUserService = async ( id: string ): Promise<void> => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
    const user = users.find(user => user.id === id)
 
    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user.isActive === false) {
        throw new AppError(400, "Inactive user")
    }

    await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set( { isActive: false } )
            .where("id = :id", { id: id })
            .execute()

    return
}

export default deleteUserService
