import { Router } from "express";
import monthlyPlanningController from "../controllers/monthlyPlanningController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const monthlyPlanningRouter = Router();

monthlyPlanningRouter.get("/getMonthlyPlanning/:year/:month", ensureAuthenticatedMiddleware, monthlyPlanningController.getMonthlyPlanning);

export default monthlyPlanningRouter;