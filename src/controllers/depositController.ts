import { Request, Response } from "express";
import depositService from "../services/depositService.js";

async function createDeposit(req: Request, res: Response) {
  const deposit = req.body;

  await depositService.createDeposit(deposit);

  res.sendStatus(201);
}

export default { 
  createDeposit,
};
