import { prisma } from "../database.js";

async function getCategories() {
  return prisma.category.findMany();
}

export default {
  getCategories,
};
