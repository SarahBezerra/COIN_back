import { Request, Response } from "express";
import paymentService from "../services/paymentService.js";

async function createPayment(req: Request, res: Response) {
  const payment = req.body;
  const {user} = res.locals;

  await paymentService.createPayment(payment, user);

  res.sendStatus(201);
}

async function getPayments(req: Request, res: Response) {
  const {user} = res.locals;

  const payments = await paymentService.getPayments(user);

  res.status(200).send(payments);
}

export default { 
  createPayment,
  getPayments,
};
