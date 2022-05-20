import { prisma } from "../database.js";
import { MonthlyPlanning } from "@prisma/client";

export type CreateMonthlyPlanning = Omit<MonthlyPlanning, "id">;

async function createMonthlyPlanning({
  userId,
  month,
  year,
  roof,
  outlay,
}: CreateMonthlyPlanning) {
  return prisma.monthlyPlanning.create({
    data: {
      userId,
      month,
      year,
      roof,
      outlay,
    },
  });
}

async function findMonthlyPlanning(
  userId: number,
  month: number,
  year: number
) {
  return prisma.monthlyPlanning.findFirst({
    where: {
      userId,
      month,
      year,
    },
  });
}

async function updateMonthlyPlanning(
  userId: number,
  month: number,
  year: number,
  value: number
) {
  return prisma.monthlyPlanning.updateMany({
    where: {
      userId,
      month,
      year,
    },
    data: {
      outlay: {
        increment: value,
      },
    },
  });
}

async function updateMonthlyPlanningLimit(
  userId: number,
  year: number,
  month: number,
  limit: number
) {
  return prisma.monthlyPlanning.updateMany({
    where: {
      userId,
      month,
      year,
    },
    data: {
      roof: limit,
    },
  });
}

async function deleteMonthlyPlanning(id: number) {
  return prisma.monthlyPlanning.deleteMany({
    where: {
      id,
    },
  });
}

export default {
  createMonthlyPlanning,
  findMonthlyPlanning,
  updateMonthlyPlanning,
  updateMonthlyPlanningLimit,
  deleteMonthlyPlanning,
};
