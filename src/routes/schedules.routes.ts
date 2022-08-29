import { Router } from "express";
import createScheduleController from "../controllers/schedules/createSchedule.controller";
import listSchedulesController from "../controllers/schedules/listSchedules.controller";
import listSchedulesByPropertieIdController from "../controllers/schedules/listSchedulesByPropertieId.controller";
import { authActiveUser } from "../middlewares/authActive.middleware";
import { authAdm } from "../middlewares/authAdm.middleware";
import { authToken } from "../middlewares/authToken.middleware";

const routes = Router()

export const schedulesRoutes = () => {
    routes.post("/", authToken, authActiveUser, createScheduleController)
    routes.get("/", listSchedulesController)
    routes.get("/properties/:id", authToken, authActiveUser, authAdm, listSchedulesByPropertieIdController)

    return routes
}

