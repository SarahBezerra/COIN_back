import { Deposit } from "@prisma/client";
import dotenv from "dotenv";
import depositRepository from "../repositories/depositRepository.js";
dotenv.config();

export type CreateDeposit = Omit<Deposit, "id">;

async function createDeposit(deposit: CreateDeposit) {
  await depositRepository.createDeposit(deposit);
}

export default {
  createDeposit,
};
