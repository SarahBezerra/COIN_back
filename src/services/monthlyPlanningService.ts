import monthlyPlanningRepository from "../repositories/monthlyPlanningRepository.js";
import paymentRepository from "../repositories/paymentRepository.js";
import { notFoundError, conflictError } from "../utils/errorUtils.js";

async function createMonthlyPlanning(
  userId: number,
  year: number,
  month: number,
  limit: number
) {
  const planning = await monthlyPlanningRepository.findMonthlyPlanning(
    userId,
    month,
    year
  );

  if (planning) {
    throw conflictError(`Planejamento do mês ${month} já existe`);
  }

  const payments = await paymentRepository.getAllPaymentsByUser(userId);
  const outlay = payments._sum.price;

  await monthlyPlanningRepository.createMonthlyPlanning({
    userId,
    year,
    month,
    roof: limit,
    outlay,
  });
}

async function getMonthlyPlanning(userId: number, year: number, month: number) {
  const planning = await monthlyPlanningRepository.findMonthlyPlanning(
    userId,
    month,
    year
  );

  return planning;
}

async function updateMonthlyPlanning(
  userId: number,
  year: number,
  month: number,
  limit: number
) {
  await monthlyPlanningRepository.updateMonthlyPlanningLimit(
    userId,
    year,
    month,
    limit
  );
}

async function deleteMonthlyPlanning(
  userId: number,
  year: number,
  month: number
) {
  const planning = await monthlyPlanningRepository.findMonthlyPlanning(
    userId,
    month,
    year
  );
  if (!planning) {
    throw notFoundError("Planejamento que está tentando excluir não existe");
  }
  await monthlyPlanningRepository.deleteMonthlyPlanning(planning.id);
}

export default {
  createMonthlyPlanning,
  getMonthlyPlanning,
  updateMonthlyPlanning,
  deleteMonthlyPlanning,
};
