import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import depositRouter from "./depositRouter.js";
import monthlyPlanningRouter from "./monthlyPlanningRouter.js";
import paymentRouter from "./paymentRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(categoryRouter);
router.use(depositRouter);
router.use(paymentRouter);
router.use(monthlyPlanningRouter);

export default router;
