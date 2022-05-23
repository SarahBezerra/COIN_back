import { Category } from "@prisma/client";
import categoryRepository from "../repositories/categoryRepository.js";
import paymentRepository from "../repositories/paymentRepository.js";
import { notFoundError, conflictError } from "../utils/errorUtils.js";

async function getCategories(userId: number) {
  const categories: Category[] = await categoryRepository.getCategories(userId);

  return categories;
}

async function deleteCategory(userId: number, categoryId: number) {
  const category = await categoryRepository.findCategoryById(categoryId);
  if (!category) throw notFoundError("Categoria não encontada");

  const sum = await paymentRepository.getSumOfPaymentsByCategory(
    userId,
    categoryId
  );

  if (sum._sum.price) {
    throw conflictError("Exclua os pagamentos dessa categoria para excluí-la");
  }

  await categoryRepository.deleteCategory(categoryId);
}

export type CreateCategory = Omit<Category, "id">;

async function createCategory(data: CreateCategory) {
  const category = await categoryRepository.findCategoryByName(
    data.name,
    data.userId
  );

  if (category) {
    throw conflictError(`Já existe uma categoria com o nome ${data.name}`);
  }

  await categoryRepository.createCategory(data);
}

export default {
  getCategories,
  deleteCategory,
  createCategory,
};
