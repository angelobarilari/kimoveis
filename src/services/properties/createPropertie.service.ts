import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Propertie } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest, IPropertyResponse } from "../../interfaces/properties/index"
import { Address } from "../../entities/addresses.entity";

const createPropertieService = async ( { value, size, address, categoryId }: IPropertyRequest ): Promise<IPropertyResponse> => {
    const { district, zipCode, number, city, state } = address
    const verifyValues = [value, size, district, zipCode, city, state, categoryId]

    verifyValues.forEach(element => {
        if (element === null) {
            throw new AppError(400, "Missing data")
        }

        if (state.length > 2) {
            throw new AppError(400, "State must be a maximum of 2 characters")
        }

        if (zipCode.length > 9) {
            throw new AppError(400, "Zipcode must be a maximum of 8 characters")
        }
    });

    const propertiesRepository = AppDataSource.getRepository(Propertie)
    const categoriesRepository = AppDataSource.getRepository(Category)
    const addressesRepository = AppDataSource.getRepository(Address)

    const category = await categoriesRepository.findOneBy({
        id: categoryId
    })
    
    if (!category) {
        throw new AppError(404, "Category not found")
    }
    
    const addresses = await addressesRepository.find()

    const addressAlreadyRegistered = addresses.find(address => {
        if (address.state === state) {
            if (address.city === city) {
                if (address.district === district) {
                    if (address.number === number) {
                        return address
                    }
                }
            }
        }
    })

    if (addressAlreadyRegistered) {
        throw new AppError(400, "Address already exists")
    }

    await addressesRepository.save(address)

    const propertie = propertiesRepository.create({
        value,
        size,
        address,
        category,
    })

    await propertiesRepository.save(propertie)

    return propertie
}

export default createPropertieService

