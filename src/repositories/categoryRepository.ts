import { prisma } from "../database.js";

async function getCategories() {
  return prisma.category.findMany();
}

async function findCategoryByName(name:string) {
  return prisma.category.findUnique({
    where: {
      name
    }
  })
}

export default {
  getCategories,
  findCategoryByName,
};
