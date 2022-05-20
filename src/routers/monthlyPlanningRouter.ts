import { Router } from "express";
import monthlyPlanningController from "../controllers/monthlyPlanningController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const monthlyPlanningRouter = Router();

monthlyPlanningRouter.get("/monthlyPlanning/:year/:month", ensureAuthenticatedMiddleware, monthlyPlanningController.getMonthlyPlanning);
monthlyPlanningRouter.put("/monthlyPlanning/:year/:month", ensureAuthenticatedMiddleware, monthlyPlanningController.updateMonthlyPlanning);

export default monthlyPlanningRouter;