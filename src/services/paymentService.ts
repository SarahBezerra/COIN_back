import dotenv from "dotenv";
import categoryRepository from "../repositories/categoryRepository.js";
import paymentRepository from "../repositories/paymentRepository.js";
import { notFoundError } from "../utils/errorUtils.js";
dotenv.config();

export interface PaymentData {
  title: string;
  description: string;
  price: number;
  date: Date;
  category: string;
}

async function createPayment(paymentData: PaymentData) {
  const { title, description, price, date, category } = paymentData;

  const categoryExists = await categoryRepository.findCategoryByName(category);
  if (!categoryExists) throw notFoundError("Categoria não encontada");

  await paymentRepository.createPayment({ title, description, price, date, categoryId: categoryExists.id })
}

export default {
  createPayment,
};
