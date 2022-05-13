import { Category } from "@prisma/client";
import dotenv from "dotenv";
import categoryRepository from "../repositories/categoryRepository.js";
dotenv.config();


async function getCategories() {
  const categories:Category[] = await categoryRepository.getCategories();

  return categories;
}

export default {
  getCategories,
};
