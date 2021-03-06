import { Payment, User } from "@prisma/client";
import { prisma } from "../database.js";

export type CreatePayment = Omit<Payment, "id">;

async function createPayment({
  userId,
  title,
  description,
  price,
  date,
  categoryId,
}: CreatePayment) {
  return prisma.payment.create({
    data: {
      userId,
      title,
      description,
      price: Number(price) * 100,
      date: new Date(date),
      categoryId,
    },
  });
}

async function getPayments(user: User) {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    where: {
      userId: user.id,
    },
    include: {
      Payment: true,
    },
  });
}

async function getPaymentsByMonth(
  userId: number,
  initialDate: Date,
  finalDate: Date
) {
  return prisma.payment.aggregate({
    _sum: {
      price: true,
    },
    where: {
      userId,
      date: {
        gte: new Date(initialDate),
        lte: new Date(finalDate),
      },
    },
  });
}

async function getSumOfPaymentsByCategory(userId: number, categoryId: number) {
  return prisma.payment.aggregate({
    _sum: {
      price: true,
    },
    where: {
      userId,
      categoryId,
    },
  });
}

export default {
  createPayment,
  getPayments,
  getPaymentsByMonth,
  getSumOfPaymentsByCategory,
};
