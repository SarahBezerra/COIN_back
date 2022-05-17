import { Request, Response } from "express";
import depositService from "../services/depositService.js";

async function createDeposit(req: Request, res: Response) {
  const deposit = req.body;
  const {user} = res.locals;

  await depositService.createDeposit(deposit, user);

  res.sendStatus(201);
}

export default { 
  createDeposit,
};
