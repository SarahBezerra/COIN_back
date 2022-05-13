import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(categoryRouter);

export default router;
