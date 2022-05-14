import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import depositRouter from "./depositRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(categoryRouter);
router.use(depositRouter);

export default router;
