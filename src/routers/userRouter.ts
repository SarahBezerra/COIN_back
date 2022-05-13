import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { loginSchema } from "../schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateSchemaMiddleware(signUpSchema),
  userController.signUp
);

userRouter.post(
  "/sign-in",
  validateSchemaMiddleware(loginSchema),
  userController.signIn
);

export default userRouter;
