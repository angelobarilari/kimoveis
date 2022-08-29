import { Express } from "express"

import { userRoutes } from "./user.routes"
import { loginRoutes } from "./login.routes"
import { categoriesRoutes } from "./categories.routes"
import { propertiesRoutes } from "./properties.routes"
import { schedulesRoutes } from "./schedules.routes"

export const appRoutes = (app: Express) => {
    app.use("/users", userRoutes())
    app.use("/login", loginRoutes())
    app.use("/categories", categoriesRoutes())
    app.use("/properties", propertiesRoutes())
    app.use("/schedules", schedulesRoutes())
}