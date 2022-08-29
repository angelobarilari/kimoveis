import { Router } from "express";

import loginUserController from "../controllers/login/loginUser.controller";

const routes = Router()

export const loginRoutes = () => {
    routes.post("/", loginUserController)

    return routes
}
