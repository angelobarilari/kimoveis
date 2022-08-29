import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const listPropertiesByCategoryService = async ( { id }: any ) => {
    const categoriesRepository = AppDataSource.getRepository(Category)
    const categories = await categoriesRepository.find()
    const findCategory = categories.find(category => category.id === id)

    if (!findCategory) {
        throw new AppError(404, "Category not found")
    }

    const properties = await categoriesRepository.findOne({
        relations: {
            properties: true
        },
        where: {
            id: findCategory?.id
        }
    })

    return properties
}

export default listPropertiesByCategoryService


