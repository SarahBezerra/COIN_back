import { Request, Response } from "express";
import monthlyPlanningService from "../services/monthlyPlanningService.js";
import { wrongSchemaError } from "../utils/errorUtils.js";

async function getMonthlyPlanning(req: Request, res: Response) {
  const { user } = res.locals;
  const { year, month } = req.params;
  
  const monthRegex = new RegExp(/^0[1-9]|1[012]|[1-9]$/);
  const yearRegex = new RegExp(/^[12][0-9]{3}$/);
  if (!(yearRegex.exec(year)) || !(monthRegex.exec(month))) {
    throw wrongSchemaError("Ano ou mês inválidos");
  }

  const planning = await monthlyPlanningService.getMonthlyPlanning(user.id, Number(year), Number(month));

  res.status(200).send(planning);

}

export default { 
  getMonthlyPlanning,
};