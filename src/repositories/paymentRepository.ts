import { Payment, User } from "@prisma/client";
import { prisma } from "../database.js";

export type CreatePayment = Omit<Payment, "id">;

async function createPayment({ userId, title, description, price, date, categoryId }:CreatePayment) {
  return prisma.payment.create({
    data: {
      userId,
      title, 
      description,
      price: Number(price)*100,
      date: new Date(date),
      categoryId,
    }
  })
}

async function getPayments(user: User) {
  return prisma.category.findMany({
    orderBy:{ name: 'asc' },
    where: {
      userId: user.id
    },
    include: {
      Payment: true,
    },
  })
}

export default {
  createPayment,
  getPayments,
};
