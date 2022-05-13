import Joi from "joi";
import { CreateUserData } from "../services/userService.js";

export const signUpSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
