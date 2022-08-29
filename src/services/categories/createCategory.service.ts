import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ( { name }: ICategoryRequest): Promise<ICategoryRequest> => {
    if (name === null) {
        throw new AppError(400, `Missing data`)
    }

    const categoriesRepository = AppDataSource.getRepository(Category)
    const categories = await categoriesRepository.find()
    const categoryAlreadyExists = categories.find(category => category.name === name)

    if (categoryAlreadyExists) {
        throw new AppError(400, "Category already exists")
    }

    const category = categoriesRepository.create({
        name
    })

    await categoriesRepository.save(category)
    
    return category
}

export default createCategoryService


