import monthlyPlanningRepository from "../repositories/monthlyPlanningRepository.js";

async function getMonthlyPlanning(userId: number, year: number, month: number)  {
  const planning = await monthlyPlanningRepository.findMonthlyPlanning(userId, month, year);

  return planning;
}

async function updateMonthlyPlanning(userId: number, year: number, month: number, limit: number)  {
  await monthlyPlanningRepository.updateMonthlyPlanningLimit(userId, year, month, limit);
}

export default {
  getMonthlyPlanning,
  updateMonthlyPlanning,
};
