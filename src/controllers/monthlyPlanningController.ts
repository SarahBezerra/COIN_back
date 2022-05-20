import { Request, Response } from "express";
import monthlyPlanningService from "../services/monthlyPlanningService.js";
import { wrongSchemaError } from "../utils/errorUtils.js";

async function createMonthlyPlanning(req: Request, res: Response) {
  const { user } = res.locals;
  const { year, month } = req.params;
  const { limit } = req.body;

  validateDate(year, month);
  validateLimit(limit);

  const limitInCents =
    String(limit.split(".")[0]) + String(limit.split(".")[1]);

  await monthlyPlanningService.createMonthlyPlanning(
    user.id,
    Number(year),
    Number(month),
    Number(limitInCents)
  );

  res.sendStatus(200);
}

async function getMonthlyPlanning(req: Request, res: Response) {
  const { user } = res.locals;
  const { year, month } = req.params;

  validateDate(year, month);

  const planning = await monthlyPlanningService.getMonthlyPlanning(
    user.id,
    Number(year),
    Number(month)
  );

  res.status(200).send(planning);
}

async function updateMonthlyPlanning(req: Request, res: Response) {
  const { user } = res.locals;
  const { year, month } = req.params;
  const { limit } = req.body;

  validateDate(year, month);
  validateLimit(limit);

  const limitInCents =
    String(limit.split(".")[0]) + String(limit.split(".")[1]);

  await monthlyPlanningService.updateMonthlyPlanning(
    user.id,
    Number(year),
    Number(month),
    Number(limitInCents)
  );

  res.sendStatus(200);
}

async function deleteMonthlyPlanning(req: Request, res: Response) {
  const { user } = res.locals;
  const { year, month } = req.params;

  validateDate(year, month);

  await monthlyPlanningService.deleteMonthlyPlanning(
    user.id,
    Number(year),
    Number(month)
  );

  res.sendStatus(200);
}

export default {
  createMonthlyPlanning,
  getMonthlyPlanning,
  updateMonthlyPlanning,
  deleteMonthlyPlanning,
};

function validateDate(year: string, month: string) {
  const monthRegex = new RegExp(/^0[1-9]|1[012]|[1-9]$/);
  const yearRegex = new RegExp(/^[12][0-9]{3}$/);
  if (!yearRegex.exec(year) || !monthRegex.exec(month)) {
    throw wrongSchemaError("Ano ou mês inválidos");
  }
  return;
}

function validateLimit(limit: string) {
  const limitRegex = new RegExp(/^([0-9]{1,10}\.[0-9]{2})$/);
  if (!limitRegex.exec(limit)) {
    throw wrongSchemaError(
      "Digite um valor contendo reais e centavos. Ex: 50.00"
    );
  }
  return;
}
