import monthlyPlanningRepository from "../repositories/monthlyPlanningRepository.js";

async function getMonthlyPlanning(userId: number, year: number, month: number)  {
  const planning = await monthlyPlanningRepository.findMonthlyPlanning(userId, month, year);

  return planning;
}

export default {
  getMonthlyPlanning,
};
