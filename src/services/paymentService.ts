import { User } from "@prisma/client";
import dotenv from "dotenv";
import categoryRepository from "../repositories/categoryRepository.js";
import monthlyPlanningRepository from "../repositories/monthlyPlanningRepository.js";
import paymentRepository from "../repositories/paymentRepository.js";
import userRepository from "../repositories/userRepository.js";
import { notFoundError } from "../utils/errorUtils.js";
dotenv.config();

export interface PaymentData {
  userId: number,
  title: string;
  description: string;
  price: number;
  date: Date;
  category: string;
}

async function createPayment(paymentData: PaymentData, user: User) {
  const { title, description, price, date, category } = paymentData;

  const categoryExists = await categoryRepository.findCategoryByName(category, user.id);
  if (!categoryExists) throw notFoundError("Categoria não encontada");

  await paymentRepository.createPayment({ userId:user.id, title, description, price, date, categoryId: categoryExists.id });

  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const planningExists = await monthlyPlanningRepository.findMonthlyPlanning(user.id, month, year);

  if(planningExists) {
    await monthlyPlanningRepository.updateMonthlyPlanning(user.id, month, year, Number(price)*100)
  }
}

async function getPayments(user: User) {
  const userExists = await userRepository.findById(user.id);
  if (!userExists) throw notFoundError("Usuário não encontado");

  const payments =  await paymentRepository.getPayments(user);
  return payments;
}

export default {
  createPayment,
  getPayments,
};
