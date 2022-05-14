import { Router } from "express";
import depositController from "../controllers/depositController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { depositSchema } from "../schemas/depositSchema.js";

const depositRouter = Router();

depositRouter.post("/create-deposit", ensureAuthenticatedMiddleware, validateSchemaMiddleware(depositSchema), depositController.createDeposit);

export default depositRouter;
