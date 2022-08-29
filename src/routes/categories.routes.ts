import { Router } from "express";

import createCategoryController from "../controllers/categories/createCategory.controller";
import { authActiveUser } from "../middlewares/authActive.middleware";
import { authAdm } from "../middlewares/authAdm.middleware";
import { authToken } from "../middlewares/authToken.middleware";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listPropertiesByCategoryController from "../controllers/categories/listPropertiesByCategory.controller";

const routes = Router()

export const categoriesRoutes = () => {
    routes.post("/", authToken, authActiveUser, authAdm, createCategoryController)
    routes.get("/", listCategoriesController)
    routes.get("/:id/properties", listPropertiesByCategoryController)

    return routes
}
