import Joi from "joi";
import { PaymentData } from "../services/paymentService.js";

export const paymentSchema = Joi.object<PaymentData>({
  title: Joi.string().optional().allow('', null),
  description: Joi.string().optional().allow('', null),
  price: Joi.number().positive().required(),  
  date: Joi.date().required(),
  category: Joi.string().required(),
});
