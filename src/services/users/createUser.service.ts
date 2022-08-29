import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserRequest } from "../../interfaces/users"
import { hash } from "bcrypt"

const createUserService = async( { name, email, password, isAdm }: IUserRequest ): Promise<IUserRequest> => {
    const verifyValues = [name, email, password, isAdm]

    verifyValues.forEach(element => {
        if (element === null) {
            throw new AppError(400, "Missing data")
        }
    });

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
    const emailAlreadyExists = users.find(user => user.email === email)

    if (emailAlreadyExists) {
        throw new AppError(400, "Email already exists")
    }

    const hashedPassword = await hash(password, 10)

    const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        isAdm
    })

    await userRepository.save(user)

    return user
}

export default createUserService
