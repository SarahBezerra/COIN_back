import monthlyPlanningRepository from "../repositories/monthlyPlanningRepository.js";
import { notFoundError } from "../utils/errorUtils.js";

async function getMonthlyPlanning(userId: number, year: number, month: number)  {
  const planning = await monthlyPlanningRepository.findMonthlyPlanning(userId, month, year);

  return planning;
}

async function updateMonthlyPlanning(userId: number, year: number, month: number, limit: number)  {
  await monthlyPlanningRepository.updateMonthlyPlanningLimit(userId, year, month, limit);
}

async function deleteMonthlyPlanning(userId: number, year: number, month: number)  {
  const planning = await monthlyPlanningRepository.findMonthlyPlanning(userId, month, year);
  if(!planning){
    throw notFoundError("Planejamento que está tentando excluir não existe")
  }
  await monthlyPlanningRepository.deleteMonthlyPlanning(userId, year, month);
}

export default {
  getMonthlyPlanning,
  updateMonthlyPlanning,
  deleteMonthlyPlanning,
};
