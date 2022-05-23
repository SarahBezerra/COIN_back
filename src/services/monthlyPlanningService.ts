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

  const { initialDate, finalDate } = generateCurrentAndEndDate(year, month);

  const payments = await paymentRepository.getPaymentsByMonth(
    userId,
    initialDate,
    finalDate
  );

  let outlay: number = 0;
  if (payments) {
    outlay = payments._sum.price;
  }

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

function generateCurrentAndEndDate(year, reqMonth) {
  let lastDay = 31;
  if (reqMonth === 2) lastDay = 28;
  else if (
    reqMonth === 2 ||
    reqMonth === 4 ||
    reqMonth === 6 ||
    reqMonth === 9 ||
    reqMonth === 11
  )
    lastDay = 30;

  let month = "0";
  if (reqMonth < 10) month += reqMonth;

  const initialDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
  const finalDate = new Date(`${year}-${month}-${lastDay}T00:00:00.000Z`);

  return { initialDate, finalDate };
}
