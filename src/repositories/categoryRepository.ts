import { prisma } from "../database.js";

async function getCategories(userId: number) {
  return prisma.category.findMany({
    where: {
      userId,
    }
  });
}

async function findCategoryByName(name:string, userId: number) {
  return prisma.category.findFirst({
    where: {
      userId,
      name,
    }
  })
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
        color: "8B0000",
        icon: "fast-food-outline",
      },
      {
        name: "Estudos",
        userId,
        color: "FFA500",
        icon: "library-outline",
      },
      {
        name: "Trasporte",
        userId,
        color: "008B8B",
        icon: "bus-outline",
      },
    ]
  });
}

export default {
  getCategories,
  findCategoryByName,
  createDefaultCategories,
};
