import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserLogin } from "../../interfaces/users"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"

const loginUserService = async( { email, password }: IUserLogin ): Promise<string> => {
    const verifyValues = [email, password]

    verifyValues.forEach(element => {
        if (element === null) {
            throw new AppError(400, `Missing data`)
        }
    });

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if(!user){
        throw new AppError(401, "Invalid email or password")
    }

    const verifyPassword = await compare(password, user.password)

    if(!verifyPassword){
        throw new AppError(403, "Invalid credentials")
    }

    if(!user.isActive){
        throw new AppError(400, "Inactive user")
    }

    const token = jwt.sign (
                                {
                                    isAdm: user.isAdm,
                                    isActive: user.isActive
                                },
                                process.env.SECRET_KEY as string,
                                {
                                    subject: user.id,
                                    expiresIn: '24h'
                                }
                            )

    return token
}

export default loginUserService



