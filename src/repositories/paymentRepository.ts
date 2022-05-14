import { Payment } from "@prisma/client";
import { prisma } from "../database.js";

export type CreatePayment = Omit<Payment, "id">;

async function createPayment({ title, description, price, date, categoryId }:CreatePayment) {
  return prisma.payment.create({
    data: {
      title, 
      description,
      price: Number(price)*100,
      date: new Date(date),
      categoryId,
    }
  })
}

export default {
  createPayment,
};
