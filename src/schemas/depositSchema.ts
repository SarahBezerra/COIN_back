import Joi from "joi";
import { CreateDeposit } from "../services/depositService.js";

export const depositSchema = Joi.object<CreateDeposit>({
  title: Joi.string().optional().allow('', null),
  description: Joi.string().optional().allow('', null),
  price: Joi.number().positive().required(),  
  date: Joi.date().required(),
});
