import { Request, Response } from "express";
import paymentService from "../services/paymentService.js";

async function createPayment(req: Request, res: Response) {
  const payment = req.body;

  await paymentService.createPayment(payment);

  res.sendStatus(201);
}

export default { 
  createPayment,
};
