import { prisma } from "../database.js";

async function findMonthlyPlanning(userId: number, month: number, year: number) {
  return prisma.monthlyPlanning.findFirst({
    where: {
      userId,
      month,
      year,
    },
  });
}

async function updateMonthlyPlanning(userId: number, month: number, year: number, value: number) {
  return prisma.monthlyPlanning.updateMany({
    where: {
      userId,
      month,
      year,
    },
    data: {
      outlay: {
        increment: value,
      }
    }
  });
}

async function updateMonthlyPlanningLimit(userId: number, year: number, month: number, limit: number) {
  return prisma.monthlyPlanning.updateMany({
    where: {
      userId,
      month,
      year,
    },
    data: {
      roof: limit,
    }
  });
}

export default {
  findMonthlyPlanning,
  updateMonthlyPlanning,
  updateMonthlyPlanningLimit,
};
