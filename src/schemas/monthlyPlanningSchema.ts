import Joi from "joi";

export const monthlyPlanningSchema = Joi.object<any>({
  year: Joi.number().valid(/^[12][0-9]{3}$/).required(),
  month: Joi.number().valid(/^(0[1-9]|1[012])|([1-9]|1[012])$/).required(),
});
