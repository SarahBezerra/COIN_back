import { Deposit, User } from "@prisma/client";
import dotenv from "dotenv";
import depositRepository from "../repositories/depositRepository.js";
dotenv.config();

export type CreateDeposit = Omit<Deposit, "id">;

async function createDeposit(deposit: CreateDeposit, user: User) {
  await depositRepository.createDeposit({...deposit, userId: user.id});
}

export default {
  createDeposit,
};
