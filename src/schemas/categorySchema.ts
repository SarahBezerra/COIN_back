import Joi from "joi";
import { CreateCategory } from "../services/categoryService.js";

export const categorySchema = Joi.object<CreateCategory>({
  name: Joi.string().required(),
  icon: Joi.string().required(),
  color: Joi.string().required(),
  userId: Joi.number().optional(),
});
