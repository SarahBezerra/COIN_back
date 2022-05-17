import { prisma } from "../database.js";
import { CreateDeposit } from "../services/depositService.js";

async function createDeposit({ title, description, price, date, userId }:CreateDeposit) {
  return prisma.deposit.create({
    data: {
      userId,
      title, 
      description, 
      price: Number(price)*100,
      date: new Date(date),
    }
  })
}

export default {
  createDeposit,
};
