import { User } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils.js";
dotenv.config();

export type CreateUserData = Omit<User, "id">;

async function signUp(createUserData: CreateUserData) {
  const { email, password } = createUserData;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw conflictError("Email já cadastrado");

  const hashedPassword = bcrypt.hashSync(password, 10);

  await userRepository.insert({ ...createUserData, password: hashedPassword });
}

export type UserLoginData = Omit<User, "id" | "username">;

async function signIn(loginData: UserLoginData) {
  const { email, password } = loginData;

  const user = await userRepository.findByEmail(email);
  if (!user) throw notFoundError("Email não cadastrado");

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) throw unauthorizedError("Senha inválida");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

export default {
  signUp,
  signIn,
};
