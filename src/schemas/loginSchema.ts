import Joi from "joi";
import { UserLoginData } from "../services/userService.js";

export const loginSchema = Joi.object<UserLoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
