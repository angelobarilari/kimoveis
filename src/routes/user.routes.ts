import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import listUserController from "../controllers/users/listUsers.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import { authToken } from "../middlewares/authToken.middleware";
import { authAdm } from "../middlewares/authAdm.middleware";
import { authActiveUser } from "../middlewares/authActive.middleware";

const routes = Router()

export const userRoutes = () => {
    routes.post("/", createUserController)
    routes.get("/", authToken, authActiveUser, authAdm, listUserController)
    routes.delete("/:id", authToken, authActiveUser, authAdm, deleteUserController)

    return routes
}