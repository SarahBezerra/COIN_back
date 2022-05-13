import { User } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import { conflictError } from "../utils/errorUtils.js";
dotenv.config();

export type CreateUserData = Omit<User, "id">;

async function signUp(createUserData: CreateUserData) {
  const { email, password } = createUserData;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw conflictError("Email must be unique");

  const hashedPassword = bcrypt.hashSync(password, 10);

  await userRepository.insert({ ...createUserData, password: hashedPassword });
}

export default {
  signUp,
};
