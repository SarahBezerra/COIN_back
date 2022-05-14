import { Router } from "express";
import paymentController from "../controllers/paymentController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { paymentSchema } from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post("/create-payment", ensureAuthenticatedMiddleware, validateSchemaMiddleware(paymentSchema), paymentController.createPayment);

export default paymentRouter;
