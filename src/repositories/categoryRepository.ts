import { prisma } from "../database.js";
import { CreateCategory } from "../services/categoryService.js";

async function getCategories(userId: number) {
  return prisma.category.findMany({
    where: {
      userId,
    },
  });
}

async function findCategoryByName(name: string, userId: number) {
  return prisma.category.findFirst({
    where: {
      userId,
      name,
    },
  });
}

async function findCategoryById(id: number) {
  return prisma.category.findFirst({
    where: {
      id,
    },
  });
}

async function deleteCategory(id: number) {
  return prisma.category.delete({
    where: {
      id,
    },
  });
}

async function createCategory({ userId, name, color, icon }: CreateCategory) {
  return prisma.category.create({
    data: {
      name,
      userId,
      color,
      icon,
    },
  });
}

async function createDefaultCategories(userId: number) {
  return prisma.category.createMany({
    data: [
      {
        name: "Pet",
        userId,
        color: "F08080",
        icon: "paw-outline",
      },
      {
        name: "Alimentação",
        userId,
        color: "ed2f2f",
        icon: "fast-food-outline",
      },
      {
        name: "Outros",
        userId,
        color: "FFA500",
        icon: "medical-outline",
      },
      {
        name: "Trasporte",
        userId,
        color: "008B8B",
        icon: "bus-outline",
      },
    ],
  });
}

export default {
  getCategories,
  findCategoryByName,
  createDefaultCategories,
  findCategoryById,
  deleteCategory,
  createCategory,
};
