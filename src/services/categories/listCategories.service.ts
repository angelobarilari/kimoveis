import AppDataSource from "../../data-source"
import { Category } from "../../entities/categories.entity"

const listCategoriesService = async (): Promise<Category[]> => {
    const categoriesRepository = AppDataSource.getRepository(Category)
    const categories = await categoriesRepository.find()

    return categories
}

export default listCategoriesService
