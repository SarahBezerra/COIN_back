import { Category } from "@prisma/client";
import dotenv from "dotenv";
import categoryRepository from "../repositories/categoryRepository.js";
dotenv.config();


async function getCategories(userId: number) {
  const categories:Category[] = await categoryRepository.getCategories(userId);

  return categories;
}

export default {
  getCategories,
};
