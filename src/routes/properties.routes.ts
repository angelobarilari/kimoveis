import { Router } from "express";
import createPropertyController from "../controllers/properties/createPropertie.controller";
import listPropertiesController from "../controllers/properties/listProperties.controller";
import { authActiveUser } from "../middlewares/authActive.middleware";
import { authAdm } from "../middlewares/authAdm.middleware";
import { authToken } from "../middlewares/authToken.middleware";

const routes = Router()

export const propertiesRoutes = () => {authAdm
    routes.post("/", authToken, authActiveUser, authAdm, createPropertyController)
    routes.get("/", listPropertiesController)

    return routes
}

